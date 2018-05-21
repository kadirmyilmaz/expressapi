import express from "express";
import { join } from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { json, urlencoded } from "body-parser";
import mustacheExpress from "mustache-express";
import nodemon from "nodemon";

import index from './routes/index';
import users from "./routes/users";

const app = express();

app.engine('mustache', mustacheExpress());

// view engine 
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(favicon(join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, '../public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
