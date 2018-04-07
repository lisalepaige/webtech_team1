const express = require('express')
const router = express.Router();

/* mongodb */
var mongo = require('mongodb');
var assert = require('assert'); // for errors and validation

var url = 'mongodb://localhost:27017/webtech';

/* GET home */
router.get('/', function(req, res){
 // test connection to database

 res.render('./home', {title: 'Home'}); 
});

/* GET kweeni */
router.get('/kweeni', function(req, res){

   /*mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    var cursor = db.db('webtech').collection('question').find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      console.log(doc); 
    }, function () {
      db.close();*/
      res.render('./kweeni', {title: 'Kweeni'}); 
    /*});
  });*/
});

/* GET wat is */
router.get('/watis', function(req, res){
    res.render('./watis', {title: 'watis'}); 
});

/* POST kweeni */
router.post('/kweeni', function (req, res, next) {
    // create item
    console.log( req.body.question__input);
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





module.exports = router;