'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv');
const indexRoute = require('./src/routes/index');
const linkRoute = require('./src/routes/links');

// will load vars in .env into PROCESS.ENV
dotenv.config();

// connect to mongodb
mongoose.connect(process.env.MONGO_HOST).catch((reason) => {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

const app = express();

// set HTTP headers for better security
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// set view location and engine
app.set('views', './src/views');
app.set('view engine', 'pug');
 
// set favicon
app.use(favicon(path.join(__dirname, './src/public', 'favicon.ico')));

// parse json body and attach to req.body
app.use(bodyparser.json());
// parse form data and attach to req.body
app.use(bodyparser.urlencoded({ extended: true }));
// set static folder to public
app.use(express.static(path.join(__dirname, './src/public')));

// mount root path to index route
app.use('/', indexRoute);
// mount /api path to link route
app.use('/api', linkRoute);
//mount /login path to login route
// app.use('/login', loginRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
