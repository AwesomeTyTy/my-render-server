const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

app.get("/", (req, res) => {
    res.send("Live chat server is running! 🚀");
});

// Handle WebSocket connections
io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    // When a user sends a message
    socket.on("chatMessage", (msg) => {
        console.log("Message received: " + msg);
        io.emit("chatMessage", msg); // Broadcast to all users
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    });
});

// Use Render's PORT environment variable
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
