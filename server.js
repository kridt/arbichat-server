// server.js eller index.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://arbichat.vercel.app", // Erstat med det rigtige domæne for din React-app
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Server logik her

// Socket.io logik
io.on("connection", (socket) => {
  console.log(`Ny klient tilsluttet: ${socket.id}`);

  // Håndterer modtagelse af beskeder fra klienten
  socket.on("send_message", (message) => {
    console.log(`Besked modtaget: ${message}`);
    // Sender beskeden tilbage til alle tilsluttede klienter
    io.emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log(`Klient frakoblet: ${socket.id}`);
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server kører på port ${PORT}`));
