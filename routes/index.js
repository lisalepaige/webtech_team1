const express = require('express')
const router = express.Router();

/* home */
router.get('/', function(req, res){
    res.render('./home', {title: 'Home'}); 
});

/* kweeni */
router.get('/kweeni', function(req, res){
    res.render('./kweeni', {title: 'kweeni'}); 
});

/* wat is */
router.get('/watis', function(req, res){
    res.send('welcome on the watis page!');
});

module.exports = router;