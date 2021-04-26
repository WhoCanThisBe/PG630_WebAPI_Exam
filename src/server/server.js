const http = require("http");
const { app, sessionParser } = require("./app");
const ws = require("ws");

// Create a basic http-server
const server = http.Server(app);

const host = process.env.APP_HOST || "http://localhost";
const port = process.env.APP_PORT || 3000;

// NB: The WebSocket server implementation below is and adaption from the following:
// https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/blob/reference/12/src/server/server.js

// Make WebSockets not create a separate server
const wsServer = new ws.Server({ clientTracking: false, noServer: true });

// Keep track of sockets
let index = 0;
const sockets = [];

wsServer.on("connection", (socket, req) => {
  console.log({ ...req.session.userId });
  console.log("WS-Server -> client connected");
  sockets.push(socket);
  socket.on("message", (msg) => {
    const { name, message } = JSON.parse(msg);
    const id = index++;
    // Broadcast message to to all
    for (const recipient of sockets) {
      recipient.send(JSON.stringify({ id, name, message }));
    }
  });
});

// Listen for request to upgrade from http(s) to WebSocket (ws://)
server.on("upgrade", (req, socket, head) => {
  sessionParser(req, {}, () => {
    if (!req.session.userId) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
    console.log("Session is parsed!");

    wsServer.handleUpgrade(req, socket, head, function (ws) {
      wsServer.emit("connection", ws, req);
    });
  });
});

// Listen for traffic on specified port
server.listen(port, () => {
  console.log(`The server was started on ${host}:${port}`);
});
