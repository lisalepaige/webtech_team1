var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

var UserSchema = new mongoose.Schema({
  name: String,
  email: String, 
  picture: String
});

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('user', { user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

module.exports = router;
