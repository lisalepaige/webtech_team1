const passport = require('passport');
const keys = require('./keys');
const User = require('../models/user-model');
var Strategy = require('passport-facebook').Strategy;

//configure to fb strategy for use by passport
passport.use(new Strategy({
    clientID: 193031364810079,
    clientSecret: '882ca5f6cf0395e9c3050ef71341fcc9',
    callbackURL: "https://kweeni2018.herokuapp.com/kweeni"
  },
    function (accessToken, refreshToken, profile, done) { 
        alert(profile); 
    }
  ));
  
  // Configure Passport authenticated session persistence.
  /*passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });
  
  //query for user id 
  passport.deserializeUser(function (id, cb) {
    User.findOne({"id": id}, function(err, user){
      cb(null, user);
    });
  });*/
  
  