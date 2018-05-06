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
    scope: ['user_id', 'email', 'picture']
}));

//callback route for fb to redirect to
router.get('/facebook/redirect', (req, res) => {
    res.send('you reached the callback uri');
});

module.exports = router;