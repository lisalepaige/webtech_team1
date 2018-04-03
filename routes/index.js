const express = require('express')
const router = express.Router();

/* mongodb */
var mongo = require('mongodb');
var assert = require('assert'); // for errors and validation

var url = 'mongodb://localhost:27017/webtech';

/* home */
router.get('/', function(req, res){
 // test connection to database
 mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    var cursor = db.db('webtech').collection('test').find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      console.log(doc); 
    }, function () {
      db.close();
      res.render('./home', {title: 'Home'}); 
    });
  });
});

/* kweeni */
router.get('/kweeni', function(req, res){
    res.render('./kweeni', {title: 'kweeni'}); 
});

/* wat is */
router.get('/watis', function(req, res){
    res.render('./watis', {title: 'watis'}); 
});

module.exports = router;