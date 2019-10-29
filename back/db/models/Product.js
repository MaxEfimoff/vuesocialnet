// Products Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  // category: { 
  //   type: Schema.Types.ObjectId,
  //   ref: 'category' },
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  name: {
    type: String
  },
  category: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted', 'published'],
    default: 'active'
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