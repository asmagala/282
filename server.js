const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');

app.use(express.static(path.join(__dirname, '/client')));

const messages = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, `/client/index.html`));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server);
io.on('connection', (socket) => {
  console.log('New client! Its id - ' + socket.id);
  socket.on('message', (message) => {
    console.log('Oh, i\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
});
  socket.on('disconnect', () => { console.log('socket ' + socket.id + ' has left')});
  console.log('I\'ve added a listener on message and disconnect event \n'); 
});
