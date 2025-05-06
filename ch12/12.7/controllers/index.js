const Room = require("../schemas/room");
const Chat = require("../schemas/chat");
const { removeRooms: removeRoomService } = require("../services");

exports.renderMain = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    res.render("main", { rooms, title: "GIF 채팅방" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderRoom = (req, res) => {
  res.render("room", { title: "GIF 채팅방 생성" });
};

exports.createRoom = async (req, res, next) => {
  try {
    const newRoom = await Room.create({
      title: req.body.title,
      max: req.body.max,
      owner: req.session.color,
      password: req.body.password,
    });
    const io = req.app.get("io"); // app.set('io',io) 로 저장했던 io 객체를 가져옴
    io.of("/room").emit("newRoom", newRoom); // /room 네임스페이스에 연결한 모든 클라이언트에 데이터를 보내는 메서드
    // get / 라우터에 접속한 모든 클라이언트가 새로 생선된 채팅방에 대한 데이터를 받을 수 있다.
    if (req.body.password) {
      //비밀번호가 있는 방이면
      res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
    } else {
      res.redirect(`/room/${newRoom._id}`);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.enterRoom = async (req, res, next) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    if (!room) {
      return res.redirect("/?error=존재하지 않는 방입니다.");
    }
    if (room.password && room.password !== req.query.password) {
      return res.redirect("/?error=비밀번호가 틀렸습니다.");
    }
    const io = req.app.get("io");
    const { rooms, sids } = io.of("/chat").adapter; //방 목록이 들어잇음
    const roomData = rooms.get(req.params.id);
    const users = roomData
      ? Array.from(roomData).map((socketId) => sids.get(socketId)?.user)
      : []; // 서버에서 초기 사용자 목록 전달
    console.log(rooms, rooms.get(req.params.id));
    if (room.max <= rooms.get(req.params.id)?.size) {
      // adapter 객체에서 제공하는 Map의 구조의 값. 이 값은 특정 방에 연결된 클라이언트(소캣)의 수를 나타냄
      return res.redirect(`/?error=허용 인원이 초과하였습니다.`);
    }
    const chats = await Chat.find({ room: room._id }).sort("createdAt"); // 기존 채팅내역 불러오기
    
    return res.render("chat", {
      room,
      title: room.title,
      chats,
      user: req.session.color,
      users,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

exports.removeRoom = async (req, res, next) => {
  try {
    await removeRoomService(req.params.id);
    res.send("ok");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.sendChat = async (req, res, next) => {
  try {
    const chat = await Chat.create({
      room: req.params.id,
      user: req.session.color,
      chat: req.body.chat,
    });
    req.app.get("io").of("/chat").to(req.params.id).emit("chat", chat);
    res.send("ok");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.sendGif = async (req, res, next) => {
  try {
    const chat = await Chat.create({
      room: req.params.id,
      user: req.session.color,
      gif: req.file.filename,
    });
    req.app.get("io").of("/chat").to(req.params.id).emit("chat", chat);
    res.send("ok");
  } catch (err) {
    console.error(err);
    next(err);
  }
};
