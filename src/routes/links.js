var express = require('express');
var validate = require('express-validation');
var linkCtrl = require('../controllers/link');
var validUrl = require('../helpers/validation');

var router = express.Router();

router.post('/geturl', validate(validUrl), linkCtrl.getShortUrl);

router.get('/redirect/:shortUrl', linkCtrl.redirectUrl);

module.exports = router;
