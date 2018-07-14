const mongoose = require('mongoose');

mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
});

module.exports = mongoose.model('userLogin', userSchema);
