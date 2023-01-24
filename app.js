const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

// Creating valid port.
// If <process.env.PORT> doesn't have or connect, it will connect port 3000 instead.
// || means 'OR'
const port = process.env.PORT || 3000;

// Tell express where to find static web files.
app.use(express.static('public'));

// Routes are coming along
// app.get is a route handler
// req : request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
});

// socket.io stuff goes here
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('connected', { sID: socket.id, message: 'new connection' });

    // Listen for incoming messages from ANYone connected to the chat service and then see what that message is.
    socket.on('chat_message', function(msg) {
        console.log(msg);

        // Step 2 - show everyone what was just sent through (send the messages to everyone connected to the service.)

        io.emit('new_message', { messages: msg });
    });
});