const express = require('express')
const router = express.Router();
var passport = "";
var mongoose = require('mongoose'); 

// connection
mongoose.connect('mongodb://localhost:27017/webtech')
var Schema = mongoose.Schema; 

// blueprint (define layout)
var questionsDataSchema = new Schema({
  text: {type: String, required: true},
  likes: 0, 
  user: String
}, {collection: 'testje'}); // stores data in collection

// create model of that blueprint
var QuestionsData = mongoose.model('QuestionsData', questionsDataSchema) 

/* GET home */
router.get('/', function (req, res) {
  res.render('./home', {
    title: 'Home'
  });
});

/* GET kweeni + data */
router.get('/kweeni', function (req, res) {
  QuestionsData.find().sort({datefield: -1})
    .then (function(result){
      res.render('kweeni', {questionslist: result}); 
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