const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  renderMain,
  renderRoom,
  createRoom,
  enterRoom,
  removeRoom,
  sendChat,
  sendGif,
} = require("../controllers");
const router = express.Router();

// get / 채팅창 목록이 보이는 메인화면
router.get("/", renderMain);

// get /room 채팅창 생성 화면
router.get("/room", renderRoom);

// post /room 채팅창 만듬
router.post("/room", createRoom);

// get /room/:id 채팅창 입장
router.get("/room/:id", enterRoom);

// delete /room:/id 채팅창 삭제
router.delete("/room/:id", removeRoom);

// post /room/:id/chat 채팅 보내기
router.post("/room/:id/chat", sendChat);

try {
    if (!fs.existsSync("uploads")) {
      console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
      fs.mkdirSync("uploads");
    }
  } catch (err) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다/");
  }
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/room/:id/gif", upload.single("gif"), sendGif);
module.exports = router;
