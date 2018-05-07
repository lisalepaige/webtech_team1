var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');
//var Strategy = require('passport-facebook').Strategy;
var authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

// keys
var keys = require('./config/keys'); 

var app = express();

var cookieSession = require('cookie-session'); 

var MongoClient = require('mongodb').MongoClient;
var local = "mongodb://localhost:27017";


// require session and set secret
/*var session = (require('express-session')({
  secret: 'sparkle',
  cookie: {
    maxAge: 40 * 24 * 60 * 60 * 1000
  },
  resave: true,
  saveUninitialized: true
}));*/

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: "ditismijntekst"
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//set up routes
app.use('/auth', authRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

module.exports = app;