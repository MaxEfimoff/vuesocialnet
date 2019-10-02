const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  // Group creator
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
  // Subscribers is an array of user IDs  //kind of likes
  subscribes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  // Posts in group
  posts: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
      ],
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
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
    }
  ],
  // Group creation date
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Group = mongoose.model("group", GroupSchema);
