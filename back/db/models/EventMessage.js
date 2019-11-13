const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventMessageSchema = new Schema({
  text: {
  eventThread: {
    type: Schema.Types.ObjectId,
    ref: 'eventThread'
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
    type: String,
    required: true,
    maxlength: [512, 'Too long, max is 512 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = EventMessage = mongoose.model('eventMessage', EventMessageSchema);
