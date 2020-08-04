const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');

app.use(express.static(path.join(__dirname, '/client')));

const messages = [];
const users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, `/client/index.html`));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server);
io.on('connection', (socket) => {
  console.log('New client! Its id - ' + socket.id);


  socket.on('join', (user) => {
    users.push({name: user.name, id: socket.id});
    console.log(users);
    console.log(`User ${user.name} is logged. It\'s id = ${socket.id}`);
    const userName = users[users.findIndex(element => element.id === socket.id)].name;
    //const userId = users.findIndex(element => element.id === socket.id);
    socket.broadcast.emit('newUser', userName);
  });

  socket.on('message', (message) => {
    console.log('Oh, i\'ve got something from ' + socket.id);
    messages.push(message);  
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => { 
    console.log('socket ' + socket.id + ' has left');
    const userName = users[users.findIndex(element => element.id === socket.id)].name;
    const userId = users.findIndex(element => element.id === socket.id);
    socket.broadcast.emit('removeUser', userName);
    users.splice(userId, 1);
    console.log(`User ${userName} has logged out.`);

    console.log(users);

  });
  console.log('I\'ve added a listener on message and disconnect event \n'); 
});
