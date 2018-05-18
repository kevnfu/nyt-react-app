const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nytreact');
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`)
});

module.exports = {
  Article: require('./Article')
}