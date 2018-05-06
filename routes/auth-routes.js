const router = require('express').Router();
const passport = require('passport');

/*auth login
router.get('/', (req, res) => {
    res.render('./home');
});
*/

//auth logout
router.get('/logout', (req, res) => {
    //with passport
    res.send('logging out');
});

//auth with facebook
router.get('/facebook',passport.authenticate('facebook', {
    scope: 'email,first_name,last_name,picture'
}));

module.exports = router;