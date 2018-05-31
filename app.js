import express from "express";
import { join } from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
// ?
import { json } from "body-parser";
import index from './routes/index';
import mongoose from 'mongoose';
import mongoURI from './config/mongo';

// connect to mongodb
mongoose.connect(mongoURI);


const app = express();

// view engine
app.set('views', './views');
app.set('view engine', 'pug');

app.use(favicon(join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(json());
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // ?
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// ?
export default app;
