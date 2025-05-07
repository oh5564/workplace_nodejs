const SocketIO = require("socket.io");

module.exports = (server, app) => {
  const io = SocketIO(server, { path: "/socket.io" }); // 서버를 생서하며, 클라이언트와의 통신 경로를 /socket.io로 설정
  app.set("io", io); // express 앱에 io 객체를 저장하여 다른곳에서 접근 가능하도록 설정

  io.on("connection", (socket) => {
    // 웹소켓 연결시
    const req = socket.request; // 소켓 요청 객체
    const {
      headers: { referer }, // HTTP Referer 헤더에서 이전 URL 가져오기
    } = req;
    const roomId = new URL(referer).pathname.split("/").at(-1); // URL 경로에서 마지막 부분 추출
    socket.join(roomId);

    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  });
};
