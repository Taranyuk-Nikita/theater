var createError = require('http-errors');
let express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var logger = require('morgan');

var indexRouter = require('./routes/index');
var repertoireRouter = require('./routes/repertoire');
var aboutRouter = require('./routes/about');
var helpRouter = require('./routes/help');
var eventRouter = require('./routes/event');
var signRouter = require('./routes/sign');
var adminRouter = require('./routes/admin');

var app = express();

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
