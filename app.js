var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var helmet = require('helmet');
var dotenv = require('dotenv');
var indexRoute = require('./src/routes/index');
var linkRoute = require('./src/routes/links');

// will load vars in .env into PROCESS.ENV
dotenv.config();

// connect to mongodb
mongoose.connect(process.env.MONGO_HOST).catch(function(reason) {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

var app = express();

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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
