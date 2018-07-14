const User = require('../models/userModel');
const querystring = require('querystring');

exports.getLogin = (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const password = req.body.password;

  User.findOne({ name, password }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (!user) {
      console.log('Could not find a matching user');
      return res.status(404).send();
    }

    const query = querystring.stringify({
      username: name,
    });
    res.redirect(`/chat?${query}`);
  });
};
