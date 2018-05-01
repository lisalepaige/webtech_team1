var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('user', { user: req.user });
});

module.exports = router;