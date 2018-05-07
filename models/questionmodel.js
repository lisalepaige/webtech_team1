const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// blueprint (define layout)
var questionSchema = new Schema({
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

var Question = mongoose.model('question', questionSchema);

module.exports = Question;