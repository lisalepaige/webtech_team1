const express = require('express')
const router = express.Router();
var passport = "";
var mongoose = require('mongoose');

// connection
mongoose.connect('mongodb://localhost:27017/webtech', {
  autoIndex: false
});
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
  search_term: {
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
  collection: 'testje'
}); // stores data in collection

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

  /* count for id NOT USED */
  QuestionsData.count({}, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      count = result;
    }
  });

  QuestionsData.find().sort({
      datefield: -1
    })
    .then(function (result) {
      console.log(result);
      res.render('kweeni', {
        questionslist: result
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
        console.log(result);
        res.render('watis', {
          title: id,
          question: result
        });
      }
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
    search_term: req.body.question__input.split(" ").join("-"),
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

/* UPDATE likes */
router.post('/kweeni', function (req, res, next) {
  // find by id? 
});

module.exports = router;