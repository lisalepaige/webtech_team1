var mongoose = require('mongoose');
const Question = require('../models/questionmodel');
var keys = require('../config/keys');

const User = require('../models/usermodel');
// voorlopig om application error te voorkomen 
//userid = "1523146284463221";


function saveAnswer(content, search_name, last_answer, loggedInUser, callback) {
  // search for the user 
  User.findOne({
    facebookId: loggedInUser
  }).then(function (result) {
    callback(null, result);

    // update question
    Question.update({
      search_name: search_name
    }, {
        $push: {
          'answers': {
            _id: last_answer,
            text: content,
            user: {
              username: result.username,
              facebookId: result.facebookId,
              picture: result.picture
            },
            count: null
          }
        }
      }, function (err, raw) {
        console.log(raw);
      });

  })
};

function saveComment(content, search_name, last_answer, loggedInUser, callback) {

  // search for the user 
  User.findOne({
    facebookId: loggedInUser
  }).then(function (result) {
    callback(null, result);
    Question.update({
      search_name: search_name,
      'answers._id': last_answer
    }, {
        $push: {
          'answers.$.comments': {
            text: content,
            user: {
              username: result.username,
              facebookId: result.facebookId,
              picture: result.picture
            }
          }
        }
      }, function (err, raw) {
        console.log(raw);
      });
  })
};

function updateLike(search_name, loggedInUser, callback) {
  User.findOne({
    facebookId: loggedInUser
  }).then(function (result) {
    callback(null, result);
    
    // update question
    Question.update({
      search_name: search_name
    }, {
      $push: {
        'likes': {
          
          user: {
            username: result.username,
            facebookId: result.facebookId,
            picture: result.picture
          }
        }
      }
    }, function (err, raw) {
      console.log(raw);
    });

  })
}

function addQuestion(search_name, loggedInUser, question, date, callback){
  User.findOne({
    facebookId: loggedInUser
  }).then(function (result) {
    // create item
    callback(null, result);
    var item = {
      text: question,
      search_name: search_name,
      current_date: date,
      user: {
        username: result.username,
        facebookId: result.facebookId,
        picture: result.picture
      }
    };

    // create instance of model 
    var data = new Question(item);
    data.save();
    
  })
}

exports.kickstart = function (server) {

  const Primus = require("primus");
  let primus = new Primus(server, { /* options */ });

  // primus.save(__dirname + '/primuslib.js'); // GENERATE CLIENT 1 TIME

  primus.on("connection", function (spark) { // spark = 1 connection
    console.log("spark connected");

    spark.on("data", function (data) {
      if (data.type == "answer") {
        last_answer = parseInt(data.last_answer) + 1;

        saveAnswer(data.content, data.search_name, last_answer, data.loggedInUser, function (err, result) {
          if (err) {
            console.log("error " + err);
          }
          var userPicture = result.picture;
          var userName = result.username;

          primus.write({
            page: data.search_name,
            content: data.content,
            type: data.type,
            user: userName,
            id: last_answer,
            img: userPicture
          });

        });
      }

      if (data.type == "comment") {
        saveComment(data.content, data.search_name, data.last_answer, data.loggedInUser, function (err, result) {
          if (err) {
            console.log("error " + err);
          }
          var userPicture = result.picture;
          var userName = result.username;
          last_answer = data.last_answer;
          primus.write({
            page: data.search_name,
            content: data.content,
            type: data.type,
            user: userName,
            id: last_answer,
            img: userPicture
          });
        });

      }

      if (data.type == "like") {
        
        updateLike(data.search_name, data.loggedInUser, function (err, result) {
          if (err) {
            console.log("error " + err);
          }

          var userPicture = result.picture;
          var userName = result.username;
          
          primus.write({
            page: data.search_name,
            type: data.type,
            user: userName,
            img: userPicture
            
          });

        });
      }

      if(data.type == "question"){
        addQuestion(data.search_name, data.loggedInUser, data.question, data.date, function (err, result){
          if (err){
            status: "No worky"
          }

          var userPicture = result.picture;
          var userName = result.username;

          primus.write({
            type: data.type,
            user: userName,
            search_name: data.search_name,
            img: userPicture,
            text: data.question
          });

        });
      }

    });
  });
}