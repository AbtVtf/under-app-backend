const express = require("express");
const app = express();
// const port = 8002;
var server = require("http").createServer(app);
const io = require("socket.io")(server);
const users = require("./configs/users");
const cors = require("cors");
const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("ok");
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("message", (data) => {
    console.log(socket.id, data.room, data.message);
    socket.to(data.room).emit("receive_message", data.message);
  });
});
server.listen(process.env.PORT || 3000, () => {
   console.log("listening on *:3000");
});
// var clients = {};

// io.on("connection", function(client) {
//   client.on("sign-in", e => {
//     let user_id = e.id;
//     if (!user_id) return;
//     client.user_id = user_id;
//     if (clients[user_id]) {
//       clients[user_id].push(client);
//     } else {
//       clients[user_id] = [client];
//     }
//   });

//   client.on("message", e => {
//     let targetId = e.to;
//     let sourceId = client.user_id;
//     if(targetId && clients[targetId]) {
//       clients[targetId].forEach(cli => {
//         cli.emit("message", e);
//       });
//     }

//     if(sourceId && clients[sourceId]) {
//       clients[sourceId].forEach(cli => {
//         cli.emit("message", e);
//       });
//     }
//   });

//   client.on("disconnect", function() {
//     if (!client.user_id || !clients[client.user_id]) {
//       return;
//     }
//     let targetClients = clients[client.user_id];
//     for (let i = 0; i < targetClients.length; ++i) {
//       if (targetClients[i] == client) {
//         targetClients.splice(i, 1);
//       }
//     }
//   });
// });

// app.get("/users", (req, res) => {
//   res.send({ data: users });
// });

// server.listen(port, () =>
//   console.log(`Example app listening on port ${port}!`)
// );
