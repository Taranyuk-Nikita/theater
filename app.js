const createError = require('http-errors');
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const logger = require('morgan');

const indexRouter = require('./routes/index');
const repertoireRouter = require('./routes/repertoire');
const aboutRouter = require('./routes/about');
const helpRouter = require('./routes/help');
const eventRouter = require('./routes/event');
const signRouter = require('./routes/sign');
const adminRouter = require('./routes/admin');

const app = express();

app.use(favicon(__dirname + '/public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);
app.use(repertoireRouter);
app.use(aboutRouter);
app.use(helpRouter);
app.use(eventRouter);
app.use(signRouter);
app.use(adminRouter);

app.use(require('helmet')());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
