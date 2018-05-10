var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');
var Strategy = require('passport-facebook').Strategy;

var app = express();

var cookieSession = require('cookie-session'); 

var config = require('config');
var dbHost = config.get('Connection.dbConfig.host');

var MongoClient = require('mongodb').MongoClient;
var local = "mongodb://localhost:27017";

//connection
var uri = "mongodb://Admin:4dm!n@gettingstarted-shard-00-00-jbvu6.mongodb.net:27017,gettingstarted-shard-00-01-jbvu6.mongodb.net:27017,gettingstarted-shard-00-02-jbvu6.mongodb.net:27017/dbkweeni?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin";
mongoose.connect(uri);
if (config.has('optionalFeature.detail')) {
  var detail = config.get('optionalFeature.detail');
  
}

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
