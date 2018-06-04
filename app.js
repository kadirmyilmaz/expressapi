import express from 'express';
import { join } from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import { json, urlencoded } from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './src/routes/index';

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
app.use(favicon(join(__dirname, './src/public', 'favicon.ico')));

// parse json body and attach to req.body
app.use(json());
// parse form data and attach to req.body
app.use(urlencoded({ extended: true }));
// set static folder to public
app.use(express.static(join(__dirname, './src/public')));

// mount root route to /api path
app.use('/api', routes);

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
  // ?
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
