const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

signToken = user => {
  
  const payload = {
    id: user.id,
    name: user.google.name,
  }

  return jwt.sign(
    payload, 
    keys.secretOrKey, 
    { expiresIn: 3600 }
  )
}

module.exports = {

  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = 'Bearer ' + signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  }
}