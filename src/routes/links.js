'use strict';

const express = require('express');
const linkCtrl = require('../controllers/links');

const router = express.Router();

router.post('/geturl', linkCtrl.getShortUrl);

router.get('/redirect/:shortUrl', linkCtrl.redirectUrl);

module.exports = router;
