const http = require("http");
const app = require("./app");
const ws = require("ws");

// https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/blob/reference/12/src/server/server.js

// Make WebSockets not create a separate server
const wsServer = new ws.Server({ noServer: true });

// Keep track of sockets
let index = 0;
const sockets = [];

// Create a basic http-server
const server = http.Server(app);

const host = process.env.APP_HOST || "http://localhost";
const port = process.env.APP_PORT || 3000;

// Listen for traffic on specified port
server.listen(port, () => {
  console.log(`The server was started on ${host}:${port}`);
});

wsServer.on("connection", (socket) => {
  console.log("WS-Server -> client connected");
  sockets.push(socket);

  socket.on("message", (msg) => {
    const { name, message } = JSON.parse(msg);
    const id = index++;
    // Broadcast message to all recipients
    for (const recipient of sockets) {
      recipient.send(JSON.stringify({ id, name, message }));
    }
  });
});

// Listen for request to upgrade from http(s) to WebSocket (ws://)
server.on("upgrade", (req, socket, head) => {
  wsServer.handleUpgrade(req, socket, head, (socket) => {
    // emit/send a "connection"-event to the websocket-server
    wsServer.emit("connection", socket, req);
  });
});
