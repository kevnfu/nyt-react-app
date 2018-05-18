const KEY = 'e4fc1d91deb54638883811b44d2981c8';
const router = require('express').Router();
const axios = require('axios');
const db = require('../model');

// Simply passes on the query to NYT article search with API KEY
// q="search term"
// begin_date, end_date = "YYYYMMDD"
router.get('/articles/search', (req, res) => {
  axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json`, {
      params: {
        ...req.query,
        'api-key': KEY
      }
    })
    .then(response => response.data.response.docs)
    .then(data => res.json(data));
});

router.get('/articles', (req, res) => {

});

router.post('/articles', (req, res) => {

});

router.delete('/articles', (req, res) => {

});

module.exports = router;