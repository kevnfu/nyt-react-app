const KEY = process.env.NYT_KEY;
const DB_CHANGE = 'dbChange';
const router = require('express').Router();
const axios = require('axios');
const db = require('../model');

module.exports = function(io) {

  // Passes on the query to NYT article search with API KEY
  // q="search term"
  // begin_date, end_date = "YYYYMMDD"
  // then cleans up the json
  router.get('/articles/search', (req, res) => {
    axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json`, {
        params: {
          ...req.query,
          'api-key': KEY
        }
      })
      .then(response => response.data.response.docs)
      .then(articles => articles.map(a => db.Article.fromNYT(a).toObject()))
      .then(articles => {
        articles.forEach(a => delete a.created_at);
        res.json(articles);
      });
  });

  router.get('/articles', (req, res) => {
    db.Article.find().then(articles => res.json(articles));
  });

  router.post('/articles', (req, res) => {
    db.Article.create(req.body)
      .then(() => {
        io.emit(DB_CHANGE);
        res.status(200).end();
      })
      .catch(err => res.status(500).send(err));
  });

  router.delete('/articles/:id', (req, res) => {
    db.Article.remove({_id: req.params.id})
      .then(() => {
        io.emit(DB_CHANGE);
        res.status(200).end();
      });
  });

  router.patch('/articles/:id/notes/', (req, res) => {
    db.Article.findById(req.params.id)
      .update({notes: req.body.notes})
      .then(() => {
        io.emit(DB_CHANGE);
        res.status(200).end();
      });
  });

  router.get('/articles/deleteall', (req, res) => {
    db.Article.remove({})
      .then(() => {
        io.emit(DB_CHANGE);
        res.status(200).end();
      });
  });

  return router;
};