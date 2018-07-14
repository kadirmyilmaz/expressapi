const User = require('../models/userModel');
// const nodemailer = require('nodemailer');
// const emailPassword = require('./emailPassword');

exports.getSignup = (req, res) => {
  console.log('oprettet');
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  // Opretter vores user objekt
  const newUser = new User();
  newUser.name = name;
  newUser.password = password;
  newUser.email = email;
  newUser.save((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  });
};

// const smtpTransport = nodemailer.createTransport({
//   service: 'hotmail',
//   host: 'smtp.hotmail.com',
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: 'kadirmyilmaz@hotmail.com',
//     pass: emailPassword.secret,
//   },
// });

// const mailOptions = {
//   from: 'kadirmyilmaz@hotmail.com',
//   to: 'kadi0102@stud.kea.dk',
//   subject: 'Hello and welcome✔',
//   text: 'You can now sign in ✔',
//   html: '<b>Regards, </b>' + '\n' + 'Kadir',
// };

// // Sender objektet
// smtpTransport.sendMail(mailOptions, (err, response) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`Message sent: ${response.message}`);
//   }
//   smtpTransport.close();
// });
