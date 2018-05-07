
//configure to fb strategy for use by passport
passport.use(new Strategy({
  clientID: 193031364810079,
  clientSecret: '882ca5f6cf0395e9c3050ef71341fcc9',
  callbackURL: "https://kweeni2018.herokuapp.com/kweeni"
},
  function (accessToken, refreshToken, profile, cb) { // access, refresh, profile, done
    /*console.log("in fb function");
    process.nextTick(function () {
      console.log("found fb data ");
      var query = Question.findOne({
        "user.fbId": profile.id
      });
      query.exec(function (err, oldUser) {
        if (oldUser) {
          console.log('Existing user: ' + oldUser.name + ' found and logged in!');
          done(null, oldUser);
        } else {
          var newUser = new Question();
          newUser.user.fbId = profile.id;
          newUser.user.name = profile.displayName;

          newUser.save(function (err) {
            if (err) {
              return done(err);
            }
            console.log('New user: ' + newUser.name + ' created and logged in!');
            done(null, newUser);
          });
        }
      });
    });*/
  }
));

// Configure Passport authenticated session persistence.
/*passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

//query for user id 
passport.deserializeUser(function (id, cb) {
  User.findOne({"id": id}, function(err, user){
    cb(null, user);
  });
});*/

