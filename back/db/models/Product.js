// Products Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  avatar: {
    type: String,
  },
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  category: {
    type: String
  },
  likes: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      }
    }
  ],
  comments: [
    {
      profile: {
        type: String,
      },
      text: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model('product', ProductSchema);