const express = require('express')
const router = express.Router();

/* home */
router.get('/', function(req, res){
    res.send('Hello Home!');
});

/* kweeni */
router.get('/kweeni', function(req, res){
    res.render('./views/kweeni', {title: 'kweeni'}); 
});

/* wat is */
router.get('/watis', function(req, res){
    res.send('welcome on the watis page!');
});

module.exports = router;