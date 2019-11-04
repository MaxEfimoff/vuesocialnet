const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

signToken = user => {
  return jwt.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, keys.secretOrKey);
}

module.exports = {

  googleOAuth: async (req, res, next) => {
    // Generate token
    console.log('got here');
    const token = 'Bearer ' + signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  }
}