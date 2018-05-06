const express = require('express')
const router = express.Router();
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var Strategy = require('passport-facebook').Strategy;
var MongoClient = require('mongodb').MongoClient;

var Schema = mongoose.Schema;

// blueprint (define layout)
var questionsDataSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  likes: {
    type: Number
  },
  search_name: {
    type: String
  },
  current_date: {
    type: Date
  },
  user: {
    _id: {
      type: Number
    },
    _fbId: {
      type: Number
    },
    name: {
      type: String
    },
    img: {
      type: String
    }
  },
  answers: [{
    _id: {
      type: Number
    },
    text: {
      type: String
    },
    user: {
      _id: {
        type: Number
      },
      name: {
        type: String
      },
      img: {
        type: String
      }
    },
    comments: [{
      _id: {
        type: Number
      },
      text: {
        type: String
      },
      user: {
        _id: {
          type: Number
        },
        name: {
          type: String
        },
        img: {
          type: String
        }
      }
    }]
  }]
}, {
    collection: 'questions'
  }); // stores data in collection

/*configure to fb strategy for use by passport
passport.use(new Strategy({
  clientID: 193031364810079,
  clientSecret: '882ca5f6cf0395e9c3050ef71341fcc9',
  callbackURL: "https://kweeni-team1.herokuapp.com/kweeni"
},
  function (accessToken, refreshToken, profile, cb) { // access, refresh, profile, done
    console.log("in fb function");
    process.nextTick(function () {
      console.log("found fb data ");
      var query = QuestionsData.findOne({
        "user.fbId": profile.id
      });
      query.exec(function (err, oldUser) {
        if (oldUser) {
          console.log('Existing user: ' + oldUser.name + ' found and logged in!');
          done(null, oldUser);
        } else {
          var newUser = new QuestionsData();
          newUser.user.fbId = profile.id;
          newUser.user.name = profile.displayName;

          newUser.save(function (err) {
            if (err) {
              return done(err);
            }
            console.log('New user: ' + newUser.name + ' created and logged in!');
            done(null, newUser);
          });
        }
      });
    });
  }
));
*/

/* Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

//query for user id 
passport.deserializeUser(function (id, cb) {
  User.findOne({"id": id}, function(err, user){
    cb(null, user);
  });
});*/

// create model of that blueprint
var QuestionsData = mongoose.model('QuestionsData', questionsDataSchema)

/* GET home */
router.get('/', function (req, res) {
  res.render('./home', {
    title: 'Home',
    user: req.user
  });
});

/* get facebook

//facebook
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/'
  }),
  function (req, res) {
    res.redirect('/kweeni');
  });
  */

/* GET kweeni + data */
router.get('/kweeni', function (req, res) {
  // sort by date
  QuestionsData.find().sort({
    current_date: -1
  })
    .then(function (result) {
      //console.log(result);
      res.render('kweeni', {
        questionslist: result,

      });
    });
});

/* GET wat is + id */
router.get('/kweeni/:id', function (req, res) {
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

  QuestionsData.distinct('answers').exec(function (err, res) {

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

    QuestionsData.update({ search_name: req.params.id }, { $push: { 'answers': { _id: newId, text: req.body.answer, count: null } } }, function (err, raw) {
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
    QuestionsData.update({ search_name: req.params.id, 'answers._id': lengte }, { $push: { 'answers.$.comments': { text: req.body.comment } } }, function (err, raw) {
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
  var data = new QuestionsData(item);
  data.save();
  res.redirect('/kweeni');
});


module.exports = router;