const express = require('express')
const router = express.Router();
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var Strategy = require('passport-facebook').Strategy;
var MongoClient = require('mongodb').MongoClient;
var keys = require('../config/keys'); 

var Schema = mongoose.Schema;

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
    }).then (function(currentUser){
      if (currentUser){
        // user already exists
        done(null, currentUser); // save to db 
      } else {
        // create new user
        new User({
          username: profile.displayName,
          facebookId: profile.id,
          picture: profile.picture.data.url
        }).save().then(function(newUser){
            done(null, newUser); // save to db
        });
      }
    });
  })
);

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// query for user id 
passport.deserializeUser(function (id, done) {
  User.findById(id).then(function(err, user){
    done(null, user);
  });
});

// check if user is not logged in
/*function checkLogin(req, res, next){
  if (!req.user){
    res.redirect('/'); 
  } else {
    next();  
  }
}*/

/* GET home */
router.get('/', function (req, res) {
  res.render('./home', {
    title: 'Home'
  });
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
      //console.log(result);
      res.render('kweeni', {
        questionslist: result,
        user: req.user.username,
        picture: req.user.picture[0].data[0].url
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
        console.log(minutes);
        res.render('watis', {
          title: id,
          question: result,
          question_min: minutes,
          answerlist: result.answers,
          commentlist: result.answers.comments
        });
      }
    });
});


/* UPDATE likes 
router.post('/kweeni/:id', function (req, res) {
  console.log("update likes");

  var id = req.params.id;
  QuestionsData.findOne({
      search_name: id
    })
    .then(function (result) {
      if (result == null) {

        console.log("error poop");

        res.render('error', {
          message: 'id not found'

          
        });
      } else {
        console.log("likes");
      } 
});
*/

/* comments */

router.post('/kweeni/:id', function (req, res) {

  Question.distinct('answers').exec(function (err, res) {

    console.log("Lengte", res.length);
    console.log(res);
    var lengte = res.length;

    let answer = req.body.answer;
    let comment = req.body.comment;

    if (answer != undefined) {
      saveAnswer(lengte);
      console.log("Saving answer =", answer);
    } else if (comment != undefined) {
      saveComment(lengte);
      console.log("Saving comment =", comment);
    }

  });

  function saveAnswer(lengte) {
    console.log("Aantal Antw", lengte);
    var newId = lengte + 1;
    console.log("New Id", newId);

    Question.update({ search_name: req.params.id }, { $push: { 'answers': { _id: newId, text: req.body.answer, count: null } } }, function (err, raw) {
      /*var searchname;
      if (err) {
        res.send(err);
      } else {
        var id = req.params.id;
        QuestionsData.findOne({
          search_name: id
        })
          .then(function (result) {
            if (result == null) {
              res.render('error', {
                message: 'id not found'
              });
            } else {
              searchname = result.search_name;
            }
          });*/
          if (err) {
            res.send(err);
          } else {
            var id = req.params.id;
            res.end();
          }
        
      

      console.log(raw);
    });
  }

  function saveComment(lengte) {
    console.log("Saving comment on ", lengte);
    Question.update({ search_name: req.params.id, 'answers._id': lengte }, { $push: { 'answers.$.comments': { text: req.body.comment } } }, function (err, raw) {
      if (err) {
        res.send(err);
      } else {
        res.end();
      }

      console.log(raw);
    });

  }
});


/* POST kweeni + save data  */
router.post('/kweeni', function (req, res, next) {
  var item = {
    text: req.body.question__input,
    likes: 0,
    search_name: req.body.question__input.split(" ").join("-"),
    current_date: new Date(Date.now()).toLocaleString(),
    user: {
      _id: 1,
      name: "Caroline",
      img: "https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg"
    }
  };

  // create instance of model 
  var data = new Question(item);
  data.save();
  res.redirect('/kweeni');
});


module.exports = router;