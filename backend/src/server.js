const express = require("express");
const socketio = require("socket.io");

const cors = require("cors");
const path = require("path");
const http = require("http");

const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(
  "mongodb+srv://******:******@******.mongodb.net/AIRCNC?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

var connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);
