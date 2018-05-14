const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// blueprint (define layout)
var questionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  likes: [{
    user: {
      _id: {
        type: Number
      },
      username: {
        type: String
      },
      facebookId: {
        type: String
      },
      picture: {
        type: String
      }
    }
  }],
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
    username: {
      type: String
    },
    facebookId: {
      type: String
    },
    picture: {
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
      username: {
        type: String
      },
      facebookId: {
        type: String
      },
      picture: {
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
        username: {
          type: String
        },
        facebookId: {
          type: String
        },
        picture: {
          type: String
        }
      },
    }]
  }]
}, {
    collection: 'questions'
  }); // stores data in collection

var Question = mongoose.model('question', questionSchema);

module.exports = Question;