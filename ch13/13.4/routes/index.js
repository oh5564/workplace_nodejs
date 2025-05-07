const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
  renderMain,
  renderJoin,
  renderGood,
  createGood,
  renderAuction,
  bid,
  renderList,
} = require("../controllers");

const router = express.Router();

router.use((req, res, next) => { // 라우터에 등록된 모든 요청 전에 실행됨
  res.locals.user = req.user; // 템플릿 엔진에서 사용할 데이터를 저장
  next();
});

router.get("/", renderMain);

router.get("/join", isNotLoggedIn, renderJoin);

router.get("/good", isLoggedIn, renderGood);

try {
  if (!fs.existsSync("uploads")) {
    console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
  }
} catch (err) {
  console.error("uploads 폴더 생성 중 에러 발생:", err);
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/"); // 업로드 파일이 저장될 폴더
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname); // 파일 확장자 추출
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post("/good", isLoggedIn, upload.single("img"), createGood);

router.get('/good/:id', isLoggedIn, renderAuction);

router.post('/good/:id/bid', isLoggedIn, bid);

router.get('/list', isLoggedIn, renderList);

module.exports = router;
