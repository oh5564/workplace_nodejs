const http = require("http");
const fs = require('fs').promises;

http
  .createServer(async (requestAnimationFrame, res) => {
    try {
      const data = await fs.readFile("./server2.html");
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(data);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      res.end(err.msessage);
    }
  })
  .listen(8081, () => {
    console.log("8081번 포트에서 서버 대기 중입니다!");
  });
