const express =require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {renderMain, renderJoin, rednerGood, createGood} = require('../controllers');

const router = express.Router();

router.use((req,res,next) => {
    res.locals.user = req.user;
    next();
});

router.get('/', renderMain);

router.get('/join',isNotLoggedIn,renderJoin);

router.get('/good',isLoggedIn,rednerGood);

try {
  if (!fs.existsSync("uploads")) {
    console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
  }
} catch (err) {
  console.error("uploads 폴더 생성 중 에러 발생:", err);
}