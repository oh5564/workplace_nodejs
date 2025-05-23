const SocketIO = require("socket.io");
const { removeRoom } = require("./services");

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: "/socket.io" });
  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");

  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);
  chat.use(wrap(sessionMiddleware));
  // 모든 chat 연결시마다 실행됨

  room.on("connection", (socket) => {
    console.log("room 네임스페이스에 접속");
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 접속 해제");
    });
  });

  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스에 접속");

    socket.on("join", (data) => {
      // data는 브라우저에서 보낸 방 아이디
      socket.join(data); // 네임스페이스 아래 존재하는 방에 접속
      const userList = Array.from(chat.adapter.rooms.get(data) || []).map(
        (id) => chat.sockets.get(id)?.request.session.color
      );
      chat.to(data).emit("updateUsers", userList); // 참가자 목록 업데이트
      socket.to(data).emit("join", {
        user: "system",
        chat: `${socket.request.session.color}님이 입장하셨습니다.`,
      });
    });

    socket.on("disconnect", async () => {
      console.log("chat 네임스페이스 접속 해제");
      const { referer } = socket.request.headers; // 브라우저 주소가 들어있음
      const roomId = new URL(referer).pathname.split("/").at(-1);
      const currentRoom = chat.adapter.rooms.get(roomId);
      const userCount = currentRoom?.size || 0;
      const userList = Array.from(chat.adapter.rooms.get(roomId) || []).map(
        (id) => chat.sockets.get(id)?.request.session.color
      );
      chat.to(roomId).emit("updateUsers", userList); // 참가자 목록 업데이트
      if (userCount === 0) {
        // 유저가 0명이면 방 삭제
        await removeRoom(roomId); // 콘트롤러 대신 서비스를 사용
        console.log("방 제거 요청 성공");
      } else {
        socket.to(roomId).
          emit("exit", {
            user: "system",
            chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
          });
      }
    });
  });
};
