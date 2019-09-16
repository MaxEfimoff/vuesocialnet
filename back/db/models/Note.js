// Note Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Note = new Schema({
  // User is associated with the Todo
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
  avatar: {
    type: String
  },
  iscompleted: {
    type: Boolean
  },

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

  // Note date
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Note = mongoose.model("note", NoteSchema);
