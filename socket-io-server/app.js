const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8080;
const mongoConnect = require('./util/database').mongoConnect;
const getDb = require('./util/database').getDb;
// const reactCryptGsm = require("./../lib/index.js") 



const app = express();
var cors = require('cors')
app.use(cors())
mongoConnect(() => {
  app.listen(3001)
})
app.use(express.json());
app.post('/find-user', function(request, response){
  const db = getDb();
  user = {
    name : request.body.user.name,
    email : request.body.user.email
  }
    db.collection("User").insertOne(user)
    console.log(request.body.user.name);
    console.log(request.body.user.email);
});

// app.post("/find-user" , (rec, res) => {
//   // console.log(rec);
//   console.log(res);

// })

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
  console.log(socket.handshake);
  socket.join(roomId);

  db.collection(roomId).find({}).toArray(function(err, result) {
    if(result.length != 0){
      socket.emit("allMessage", result); 
    }
  });
    socket.on('new User', (user) => {
            console.log("new User");

      console.log(user);
  
});
  socket.on('chat message', (msg) => {
    console.log(roomId);
  db.collection(roomId).insertOne(msg)
  socket.in(roomId).emit("send message", msg);
});
  socket.on("delete message", (id) => {
      value = {_id : id }
      db.collection(roomId).deleteOne(value, function(err, obj) {
      });
  socket.in(roomId).emit('delete', id);
});


});



server.listen(port, () => console.log(`Listening on port ${port}`));