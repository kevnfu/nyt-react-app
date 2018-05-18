const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  headline: String,
  snippet: String,
  byline: String,
  date: String,
  url: String,
  created_at: { type: Date, required: true, default: Date.now },
  notes: String
});

/**
 * Creates new document from NYT API json.
 * Is NOT saved.
 */
ArticleSchema.statics.fromNYT = function(data) {
  return new this({
    headline: data.headline.main,
    snippet: data.snippet,
    byline: data.byline && data.byline.original,
    date: data.pub_date,
    url: data.web_url
  });
}

module.exports = mongoose.model('Article', ArticleSchema);