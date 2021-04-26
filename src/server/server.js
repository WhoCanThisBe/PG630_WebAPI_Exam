const http = require("http");
const app = require("./app");

// Create a basic http-server
const server = http.Server(app);

const host = process.env.APP_HOST || "http://localhost";
const port = process.env.APP_PORT || 3000;

// Listen for trafic on specified port
server.listen(port, () => {
  console.log(`The server was started on ${host}:${port}`);
});
