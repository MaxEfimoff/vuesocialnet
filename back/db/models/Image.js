const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    image: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
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
});

module.exports = mongoose.model('Image', imagesSchema);
