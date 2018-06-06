'use strict';

const express = require('express');
const linkCtrl = require('../controllers/link');

const router = express.Router();

router.post('/geturl', linkCtrl.getShortUrl);

router.get('/redirect/:shortUrl', linkCtrl.redirectUrl);

module.exports = router;
