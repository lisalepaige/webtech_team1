const passport = require('passport');
const facebookStrategy = require('passport-facebook');
const keys = require('./keys');

passport.use(new facebookStrategy ({
    //options for the fb strategy
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/redirect"

}, (accesToken, refreshToken, email, done ) => {
        //passport callback function
        //console.log(email);
})
);