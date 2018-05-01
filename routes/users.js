var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

var UserSchema = new mongoose.Schema({
  name: String,
  email: String, 
  picture: String
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
