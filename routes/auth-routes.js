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
    scope: ['email']
}));

//callback route for fb to redirect to
//comes back with code where the info is in
router.get('/facebook/redirect',passport.authenticate('facebook',
    (req, res) => {
        res.send('you reached the callback uri');
}));

module.exports = router;