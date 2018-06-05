var express = require('express');
var linkCtrl = require('../controllers/link');

var router = express.Router();

router.post('/geturl', linkCtrl.getShortUrl);

router.get('/redirect/:shortUrl', linkCtrl.redirectUrl);

module.exports = router;
