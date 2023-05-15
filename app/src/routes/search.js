const express = require('express');
const router = express.Router();


router.get('/search', (req, res) => {
 
  const keywords = req.query.keywords;

  
  res.render('search-results', { results: results });
});

module.exports = router;
