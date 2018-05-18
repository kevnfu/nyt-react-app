const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const db = require('./server/model');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', require('./server/routes/api-routes'));

app.get('/test', (req, res) => {
  res.send('Hello world');
});

// Send every request to the React app
// Define any API routes before this runs
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
