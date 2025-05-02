const express = require("express");
const {
  renderMain,
  renderRoom,
  createRoom,
  enterRoom,
  removeRoom,
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

module.exports = router;
