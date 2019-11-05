const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    // required: true
  },
  local: {
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    name: {
      type: String
    },
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    name: {
      type: String
    },
  },
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);