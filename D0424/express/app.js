const express = require("express");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(
  (req, res, next) => {
    console.log("1. 요청에 실행하고 싶어요");
    next();
  },
  (req, res, next) => {
    try {
      console.log(asdfasdfaf);
    } catch (error) {
      next(error);
    }
  }
);

app.get("/", (req, res,next) => {
  res.sendFile(path.join(__dirname, "index.html"));
  //   res.json({hello: 'hi'});
  if(true) {
    next('route'); // 밑에 get 부분 실행됨
  } else {
    next(); // 실행되나요? 가 실행됨
  }
}, (req,res) =>{
    console.log('실행되나요?');
});

app.get("/", (req, res) => {
    console.log('실행되지롱');
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

app.use((req, res, mext) => {
  res.status(200).send("404");
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("ERROR");
});
app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
