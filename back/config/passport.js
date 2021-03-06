const JwtStrategy = require('passport-jwt').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
// const GooglePlusTokenStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
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

  passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: '509313626583580',
    clientSecret: '4478f5a817194e60d7c5a5d6e5e2a9fb'
  }, (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    User.findOne({ "facebook.id": profile.id})
    // User.findOne({"email": profile.emails[0].value})
      .then(user => {
        if (user) {
          console.log('User already exists in our DB');
          return done(null, user);
        }
        console.log('User does not exist in our DB')
        const newUser = new User({
          method: 'facebook',
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName
          }
        })
        newUser.save()
        done(null, newUser);
        
      })
      .catch(err => console.log(err));
  }))

  passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '162155419024-ct4f6h85fa5juklis6ird1eqvqs4e129.apps.googleusercontent.com',
    clientSecret: 'EIxEt4zRNl6FeJoLU--Ef3m4'
  }, (accessToken, refreshToken, profile, done) => {
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
        newUser.save()
        done(null, newUser);
        
      })
      .catch(err => console.log(err));
  }))
};
