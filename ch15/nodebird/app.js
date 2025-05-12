const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");
const helmet = require("helmet");
const hpp = require("hpp");
const { createClient } = require("redis");
const {RedisStore} = require("connect-redis");

dotenv.config();

// Redis 클라이언트 생성
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});
redisClient.connect().catch(console.error); // 연결 오류 처리

const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const { sequelize } = require("./models");
const passportConfig = require("./passport");
const logger = require("./logger");

const app = express();
passportConfig(); // 패스포트 설정
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션 설정
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new RedisStore({ client: redisClient }),
};
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  // sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));
app.use(passport.initialize()); // req 객체에 passport 설정을 심는다
app.use(passport.session()); // req.session 객체에 passport 정보 저장. req.session 객체는 express-session 에서 생성하는것이므로 express-session 뒤에 연결해야 한다

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  logger.info("hello");
  logger.error(error.message);
  next(Error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
