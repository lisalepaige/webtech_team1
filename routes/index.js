const express = require('express')
const router = express.Router();

var texttoshow = ""; 
var passport = "";

/* mongodb */
var mongo = require('mongodb');
var assert = require('assert'); // for errors and validation

var url = 'mongodb://localhost:27017/webtech';

/* GET home */
router.get('/', function (req, res) {
  res.render('./home', {
    title: 'Home'
  });
});

/* GET kweeni */
router.get('/kweeni', function (req, res) {
      mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.db('webtech').collection('question').find().toArray(function(err, result){
          console.log(result); 
          if (err){
            res.send(err); 
          } else if (result.lenght=!0){ // result is not empty
            res.render('kweeni', {"questionslist": result});
            console.log(result); 
          } else {
            res.send('no questions found'); 
          }
          });
        });
      });

      /* GET wat is */
      router.get('/watis', function (req, res) {
        res.render('./watis', {
          title: 'watis'
        });
      });

      router.post('/watis', function (req, res) {

      });


      /* POST kweeni */
      router.post('/kweeni', function (req, res, next) {
        // create item
        console.log(req.body.question__input);
        var item = {
          question: req.body.question__input,
          author: "tester"
        };

        console.log(item);
        // connect to mongo db
        mongo.connect(url, function (err, db) {
          assert.equal(null, err);
          // acces database, use collection to insert item 
          db.db('webtech').collection('test').insertOne(item, function (err, result) {
            // callback (if no errors)
            assert.equal(null, err);
            console.log('Item inserted');
            console.log(item);
            db.close();
          });
        });
        // redirect to home page
        res.redirect('/');
      });

      

      /*router.get('/kweeni', function (req, res) {
        mongo.connect(url, function (err, db) {
          assert.equal(null, err);
          db.db('webtech').collection('question').find().toArray(function(err, result){
            console.log(result); 
            if (err){
              res.send(err); 
            } else if (result.lenght=!0){ // result is not empty
              res.render('kweeni', {"questionslist": result});
            } else {
              res.send('no questions found'); 
            }
            db.close();
          });
        });
      });*/


      module.exports = router;