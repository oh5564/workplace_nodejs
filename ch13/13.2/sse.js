const SSE = require('sse');

module.exports = (server) => {
    const see = new SSE(server);
    see.on('connection', (client) => {// 서버이벤트 연결
        setInterval(()=>{
            client.send(Date.now().toString());
        }, 1000);
    });
};