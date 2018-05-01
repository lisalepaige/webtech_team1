var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



var MongoClient = require('mongodb').MongoClient;
var local = "mongodb://localhost:27017";
//connection
var uri = "mongodb://Admin:4dm!n@gettingstarted-shard-00-00-jbvu6.mongodb.net:27017,gettingstarted-shard-00-01-jbvu6.mongodb.net:27017,gettingstarted-shard-00-02-jbvu6.mongodb.net:27017/dbkweeni?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin";
mongoose.connect(uri);


// start session
app.use(session({
  secret: 'sparkle',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the session.
// passport init
app.use(passport.initialize());
app.use(passport.session());

// Lets user information be stored and retrieved from session
passport.serializeUser(function(user, done) {
  done(null, user.fbId);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
       if(err) done(err);
           done(null,user);
       });
  });

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
