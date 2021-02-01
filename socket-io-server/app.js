const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8080;
// const index = require("./routes/index");
const app = express();
// app.use(index);
var cors = require('cors')
app.use(cors())

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

let interval;

// io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
//     console.log('new client connected');
//     socket.emit('connection', null);
// });
// io.on("connection", (socket) => {
//   console.log("snir");
//   socket.on("disconnect", ()=>{
//     console.log("Disconnected")
//   })
// });

io.on("connection", (socket) => {
  console.log(`New client ${socket.id} connected`);
  socket.on('chat message', (msg) => {
    console.log(`${socket.id} new message : ` + msg);
    io.emit("FromAPI", msg);
  });
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);
  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  //   clearInterval(interval);
  // });
});

const getApiAndEmit = socket => {
  const response = new Date();
  console.log(response);
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));