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
  likes: {type: Number},
  user: {
    _id: {type: Number},
    name: {type: String},
    img: {type: String}
  },
  answers: [{
    _id: {type: Number},
    text: {type: String},
    user: {
      _id: {type: Number},
      name: {type: String},
      img: {type: String}
    },
    comments: [{
      _id: {type: Number},
      text: {type: String},
      user: {
        _id: {type: Number},
        name: {type: String},
        img: {type: String}
      }
    }]
  }]
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
      console.log(result); 
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
  var item = {
    text: req.body.question__input,
    likes: 0,
    user: {
      _id: 1,
      name: "Caroline",
      img: "caro.jpg"
    }
  };

  // create instance of model 
  var data = new QuestionsData(item); 
  data.save(); 
  res.redirect('/kweeni');
});

/* UPDATE likes */
router.post('/kweeni', function (req, res, next) {
  // find by id? 
});

module.exports = router;