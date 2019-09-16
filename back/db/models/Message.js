// Message Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  // User is associated with the Message
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  recipient: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },

  // Likes is an array of user IDs
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],

  // Comments is an array of objects with user IDs, texts, names, avatars and dates
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        require: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  // Message date
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model("message", MessageSchema);
