var mongoose = require('mongoose');
// pluralize bruges til at have modellen i ental form
mongoose.pluralize(null);

var linkSchema = new mongoose.Schema({
  originalLink: String,
  shortLink: String,
});

module.exports = mongoose.model('links', linkSchema);
