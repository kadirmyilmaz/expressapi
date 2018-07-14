const express = require('express');
const loginCtrl = require('../controllers/login');

const router = express.Router();

router.post('/login', loginCtrl.getLogin);

module.exports = router;
