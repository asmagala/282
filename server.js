const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/client')));

const messages = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, `/client/index.html`));
});

/*
const db = require('./data/db.js');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

//app.use(express.urlencoded({extended: false}));
//app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ "message": "Not found..."});
});
*/

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
