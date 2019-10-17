// Posts Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'users'
  // },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  avatar: {
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
  likes: [
    // {
    //   user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    //   }
    // }
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      }
    }
  ],
  comments: [
    {
      // user: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'users'
      // },
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

module.exports = Post = mongoose.model('post', PostSchema);