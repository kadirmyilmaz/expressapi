const express = require('express');
const signupCtrl = require('../controllers/signup');

const router = express.Router();

router.get('/signup', signupCtrl.getSignup);

module.exports = router;
