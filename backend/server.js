const express = require("express");
const fs = require("fs");
const http = require('http');
const dotenv = require("dotenv").config();
const cors = require("cors");
const {Server} = require("socket.io");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server , {
  cors: {
    origin: "*", 
  }
});

io.on('connection' , (socket)=>{
  console.log("a user connected : " + socket.id );

  socket.on("recieve message" , (msg)=>{
    console.log("client " + socket.id + " send : " + msg);
  })

  socket.emit('recieve message' , "message sent from server!!");

  socket.on('disconnect' , ()=>{
    console.log("user disconnected : " );
  });
});

app.get("/", (req, res) => {
  res.status(200).send("hello from server");
});

server.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}...`);
});
