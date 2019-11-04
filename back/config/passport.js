const JwtStrategy = require('passport-jwt').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const mongopassword = 'WildBlood02021984+';

// JWT options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// Exports JWT Strategy
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Serch for registered user
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '327558713168-s1j5bapja5fele8h1mjp92cmieo71j1s.apps.googleusercontent.com',
    clientSecret: 'ICY3FRpBmLY0LufHnN_7ORxG'
  }, (accessToken, refreshToken, profile, done) => {
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);
    // console.log('profile', profile);
    User.findOne({ "google.id": profile.id})
    User.findOne({"email": profile.emails[0].value})
      .then(user => {
        if (user) {
          console.log('User already exists in our DB');
          console.log(user)
          return done(null, user);
        }
        console.log('User does not exist in our DB')
        const newUser = new User({
          method: 'google',
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName
          }
        })
        // console.log(newUser)
        newUser.save()
        done(null, newUser);
        
      })
      .catch(err => console.log(err));
  }))
};
