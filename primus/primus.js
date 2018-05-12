var mongoose = require('mongoose');
const Question = require('../models/questionmodel');
var keys = require('../config/keys');

const User = require('../models/usermodel');
// voorlopig om application error te voorkomen 
//userid = "1523146284463221";


function saveAnswer(content, search_name, last_answer/*, loggedInUser*/) {
  //alert(loggedInUser); 
  // search for the user 
  /*User.findOne({
    username: loggedInUser
  }).then(function (result) {*/

    // update question
    Question.update({
      search_name: search_name
    }, {
      $push: {
        'answers': {
          _id: last_answer,
          text: content,
          /*user: {
            username: result.username,
            facebookId: result.facebookId,
            picture: result.picture
          },*/
          count: null
        }
      }
    }, function (err, raw) {
      console.log(raw);
    });

  /*})*/
};

function saveComment(content, search_name, last_answer, loggedInUser) {
  
  // search for the user 
  /*User.findOne({
    facebookId: userid
  }).then(function (result) {*/

    // update answer
    Question.update({
      search_name: search_name,
      'answers._id': last_answer
    }, {
      $push: {
        'answers.$.comments': {
          text: content,
            user: {
            username: loggedInUser/*,
            facebookId: result.facebookId,
            picture: result.picture*/
          }
        }
      }
    }, function (err, raw) {
      console.log(raw);
    });
  /*})*/
};

function updateLike(search_name, callback) {
  Question.findOne({
    'search_name': search_name
  }).select('likes -_id').then(function (likes) {
    callback(null, likes.likes);
    var newLikes = likes.likes + 1;
    Question.update({
      search_name: search_name
    }, {
      $set: {
        likes: newLikes
      }
    }, function (err, raw) {
      console.log(raw);

    });
  });


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
        console.log("Last answer =" + last_answer);
        saveAnswer(data.content, data.search_name, last_answer/*, loggedInUser*/);
        primus.write({
          page: data.search_name,
          content: data.content,
          type: data.type,
          id: last_answer/*,
          loggedInUser: loggedInUser*/
        });
      }

      if (data.type == "comment") {
        saveComment(data.content, data.search_name, data.last_answer, data.loggedInUser);
        last_answer = data.last_answer
        primus.write({
          page: data.search_name,
          content: data.content,
          type: data.type,
          id: last_answer
        });
      }

      if (data.type == "like") {
        //primus.write({page : data.search_name, type: data.type});
        updateLike(data.search_name, function (err, likes) {
          if (err) {
            console.log("error " + err);
          }
          var updatedLikes = likes + 1;
          primus.write({
            page: data.search_name,
            type: data.type,
            likes: updatedLikes
          });

        });
      }
    });
  });
}