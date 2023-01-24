const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

// Creating valid port.
// If <process.env.PORT> doesn't have or connect, it will connect port 3000 instead.
// || means 'OR'
const port = process.env.PORT || 3000;

// Routes are coming along
// app.get is a route handler
// req : request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
});