const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  snippet: String,
  date: String,
  url: String,
  saved: Boolean,
  notes: String
});

module.exports = mongoose.model('Article', ArticleSchema);