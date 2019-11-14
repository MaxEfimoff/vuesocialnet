const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventThreadPostSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  text: {
    type: String,
    required: true,
    maxlength: [512, 'Too long, max is 512 characters']},
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  eventThread: {
    type: Schema.Types.ObjectId,
    ref: 'eventThread'
  }
});

module.exports = EventThreadPost = mongoose.model('eventThreadPost', EventThreadPostSchema );
