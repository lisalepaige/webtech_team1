const express = require('express')
const router = express.Router();
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var Strategy = require('passport-facebook').Strategy;
var MongoClient = require('mongodb').MongoClient;
var keys = require('../config/keys');

var Schema = mongoose.Schema;

var loggedInUser; 
var loggedInId; 
var loggedInPic;

var pictureCount = 0; 

// require models
const Question = require('../models/questionmodel');
const User = require('../models/usermodel');

//configure to fb strategy for use by passport
passport.use(new Strategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "https://kweeni2018.herokuapp.com/kweeni"
  },
  function (accessToken, refreshToken, profile, done) { // access, refresh, profile, done 
    User.findOne({
      facebookId: profile.id
    }).then(function (currentUser) {
      if (currentUser) {
        // user already exists
        done(null, currentUser); // save to db 
      } else {
        // create new user
        new User({
          username: profile.displayName,
          facebookId: profile.id,
          picture: "https://graph.facebook.com/" + profile.id + "/picture",
          counter: 0, 
          loggedIn: true
        }).save().then(function (newUser) {
          done(null, newUser); // save to db
        });
        pictureCount++; 
      }
    });
  }));

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// query for user id 
passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (err, user) {
    done(null, user);
  });
});

/* GET home */
router.get('/', function (req, res) {
  User.find().sort({
    _id: 1}).limit(12)
  .then(function (result) {
    res.render('./home', {
      pictures: result
    });
  });
});

/* GET logout */
router.get('/logout', (req, res) => {
  // logout
  req.logout(); 
  res.redirect('/'); 

});

// start authentication process 
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

/* GET kweeni + data */
router.get('/kweeni', /*checkLogin, */ passport.authenticate('facebook'), function (req, res) {
  // sort by date
  Question.find().sort({
      current_date: -1
    })
    .then(function (result) {
      loggedInUser = req.user.username;
      loggedInId = req.user.facebookId;
      loggedInPic = req.user.picture; 
      res.render('kweeni', {
        questionslist: result,
        user: req.user.username,
        picture: "https://graph.facebook.com/" + req.user.facebookId + "/picture"
      });
    });
});

/* GET wat is + id */
router.get('/kweeni/:id', function (req, res) {
  var id = req.params.id;
  Question.findOne({
      search_name: id
    })
    .then(function (result) {
      if (result == null) {
        res.render('error', {
          message: 'id not found'
        });
      } else {
        var minutes = result.current_date.getMinutes(); 
        var countLikes = result.likes.length;
        var finalCount = countLikes -1;
        res.render('watis', {
          title: id,
          question: result,
          question_min: minutes,
          answerlist: result.answers,
          likelist: result.likes,
          commentlist: result.answers.comments,
          user: loggedInUser,
          userid: loggedInId,
          userpic: loggedInPic,
          likes: finalCount
         });
      }
    });
});

/* POST kweeni + save data  */
router.post('/kweeni', function (req, res, next) {
  // search for the user information 
  User.findOne({
      username: loggedInUser
    })
    .then(function (result) {
      // create item
      var item = {
        text: req.body.question__input,
        likes: 0,
        search_name: req.body.question__input.split(" ").join("-"),
        current_date: new Date(Date.now()).toLocaleString(),
        user: {
          username: result.username,
          facebookId: result.facebookId,
          picture: result.picture
        }
      };
      // create instance of model 
      var data = new Question(item);
      data.save();
      res.redirect('/kweeni');
    })
});

module.exports = router;