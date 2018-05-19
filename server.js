const PORT = process.env.PORT || 3001;
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const db = require('./server/model');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// api routes
app.use('/api', require('./server/routes/api-routes')(io));

app.get('/test', (req, res) => {
  res.send('Hello world');
});

// Send every request to the React app
// Define any API routes before this runs
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});