const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjetcId },
} = Schema;
const chatSchema = new Schema({
  room: {
    //채팅방 아이디 룸 스키마와 연결하여 Room 컬렉션의 objectId가 들어간다
    type: ObjetcId,
    required: true,
    ref: "Room",
  },
  user: {
    //채팅을 한 사람
    type: String,
    required: true,
  },
  chat: String, //채팅 내역
  gif: String, // gif 이미지 주소
  createdAt: {
    //채팅 시간
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
