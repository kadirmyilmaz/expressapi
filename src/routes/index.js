'use strict';

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Custom URL Shortener',
  });
});

module.exports = router;
