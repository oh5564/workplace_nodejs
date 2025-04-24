const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));

//app.use('요청 경로', express.static('실제 경로'));
// localhost:3030/hello.html     -> D0424/public/hello.html 정적파일
app.use("/", express.static(path.join(__dirname, "public"))); // 파일 찾으면 next 안되고 끝
// 미들웨어 확장법
app.use("/", (req, res, next) => {
  if (req.session.id) {
    express.static.join(__dirname, "/public")(req, res, next);
  } else {
    next();
  }
});
app.use(cookieParser("ohpassword"));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "ohpassword",
    cookie: {
      httpOnly: true,
    },
  })
);
app.use(express.json()); //req.body에 넣어줌
app.use(express.urlencoded({ extended: true })); // form 파싱해줌
app.use(multer().array());

app.use((req, res, next) => {
  req.data = "oh비번";
});
app.get("/", (req, res, next) => {
  req.data; // oh비번
  // req.cookies; // {mycookie: 'test'}
  // req.signedCookies;
  //   // 'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires = ${expires.toGMTString()}; HttpOnly, path=/`,
  // res.cookie('name', encodeURIComponent(name), {
  //   expires: new Date(),
  //   httpOnly: true,
  //   path: '/',
  // })
  // res.clearCookie('name', encodeURIComponent(name), {
  //   httpOnly: true,
  //   path: '/',
  // })
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/category/Javascript", (req, res) => {
  res.send(`hello Javascript`);
});
app.get("/category/:name", (req, res) => {
  res.send(`hello wildcard`);
});

app.post("/", (req, res) => {
  res.send("hello express");
});
app.get("/about", (req, res) => {
  res.send("hello express");
});
app.use((req, res, next) => {
  res.status(404).send("404지롱");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("ERROR");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
