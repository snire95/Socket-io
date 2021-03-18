const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8080;
const mongoConnect = require('./util/database').mongoConnect;
const getDb = require('./util/database').getDb;

const app = express();
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
var cors = require('cors')
app.use(cors())
mongoConnect(() => {
  app.listen(3001)
})


const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});



io.on("connection", (socket) => {
  console.log(`New client ${socket.id} connected`);
  const db = getDb();
  const { roomId } = socket.handshake.query;
  console.log(roomId);
  socket.join(roomId);


  // const { roomId } = socket.handshake.query;
  // socket.join(roomId);
  
  // socket.on('Recover messages', (socket_id) => {
      db.collection(roomId).find({}).toArray(function(err, result) {
        // message = [result,socket_id]
        console.log("test");
        console.log(result.length);
        if(result.length != 0){
          socket.emit("allMessage", result); 

        }
  });
  // });
  //   socket.on('join', (room) => {
  //     console.log(`Socket ${socket.id} joining ${room}`);
  //     socket.join(room);
  // });

  socket.on('chat message', (msg) => {
  db.collection(roomId).insertOne(msg)
  console.log(`${socket.id} new message : ` + msg.content);
  console.log(msg)
  socket.in(roomId).emit("send message", msg);

});


});



server.listen(port, () => console.log(`Listening on port ${port}`));