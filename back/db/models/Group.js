const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  //User who created a group
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,

    required: true,
    max: 40
  },
  status: {
    type: String
  },

  info: {
    type: String
  },

  avatar: {
    type: String
  },
  //subscribers is an array of user IDs  //kind of likes
  subscribes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  //Posts in group
  posts: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  //comments is an array of objects with user IDs, texts, names, avatars and dates
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
  //group creation date
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Group = mongoose.model("group", GroupSchema);
