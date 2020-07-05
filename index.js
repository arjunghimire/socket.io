var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.username = "Anonymous";
  socket.on("disconnect", (socket) => {
    console.log("socket value", socket);
    console.log("a user disconnected");
  });
  socket.on("change_username", (data) => {
    socket.username = data.username;
  });
  socket.on("new_message", (data) => {
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username,
    });
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
