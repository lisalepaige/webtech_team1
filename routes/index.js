const express = require('express')
const router = express.Router();
var passport = "";
var mongoose = require('mongoose'); 

// connection
mongoose.connect('mongodb://localhost:27017/webtech')
var Schema = mongoose.Schema; 


/* mongodb */
/*var mongo = require('mongodb');
var assert = require('assert'); // for errors and validation

var url = 'mongodb://localhost:27017/webtech';*/

/* GET home */
router.get('/', function (req, res) {
  res.render('./home', {
    title: 'Home'
  });
});

/* GET kweeni + data */
router.get('/kweeni', function (req, res) {
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    
    // get length of array
    db.db('webtech').collection('testje').count({}, function(error, result){
      if (error){
        console.log(error); 
      } else {
      //console.log(result); 
      aantal_id = result; 
      }
    });

    // order by date
    db.db('webtech').collection('testje').find().sort({datefield: -1}).toArray(function (err, result) {
      console.log("_____________________________");
      if (err) {
        res.send(err);
      } else if (result.lenght = !0) { // result is not empty
        res.render('kweeni', {
          "questionslist": result
        });
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

/* POST wat is */
router.post('/watis', function (req, res) {

});


/* POST kweeni + save data  */
router.post('/kweeni', function (req, res, next) {
  // create item
  //console.log(req.body.question__input);
  var item = {
    text: req.body.question__input,
    user_id: 1
  };

  console.log(item);
  // connect to mongo db
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    // acces database, use collection to insert item 
    db.db('webtech').collection('testje').insertOne(item, function (err, result) {
      // callback (if no errors)
      assert.equal(null, err);
      console.log('Item inserted');
      //console.log(item);
      db.close();
    });
  });
  // redirect to home page
  res.redirect('/kweeni');
});

module.exports = router;