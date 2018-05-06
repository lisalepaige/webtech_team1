const passport = require('passport');
const facebookStrategy = require('passport-facebook');
const keys = require('./keys');

passport.use(new facebookStrategy ({
    //options for the fb strategy
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "https://kweeni2018.herokuapp.com/auth/facebook/redirect"

}, ( ) => {
        //passport callback function
        console.log('passport callback fired');
})
)