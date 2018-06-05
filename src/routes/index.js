var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Custom URL Shortener',
  });
});

module.exports = router;
