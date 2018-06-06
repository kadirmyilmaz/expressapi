'use strict';

const mongoose = require('mongoose');
// pluralize bruges til at have modellen i ental form
mongoose.pluralize(null);

<<<<<<< HEAD
let linkSchema = new mongoose.Schema({
=======
const linkSchema = new mongoose.Schema({
>>>>>>> 2b0b6e73d890fe3ebc2b2d93a3de901965e9d007
  originalLink: String,
  shortLink: String,
});

module.exports = mongoose.model('links', linkSchema);
