const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventThreadSchema = new Schema({
  event: { 
    type: Schema.Types.ObjectId,
    ref: 'event'
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  eventMessage: [{
    type: Schema.Types.ObjectId, ref: 'eventMessage'
  }],
  title: { 
    type: String,
    required: true,
    maxlength: [512, 'Too long, max is 512 characters']
  },
  createdAt: {
    type: Date, default: Date.now
  },
  updatedAt: {
    type: Date, default: Date.now
  },
});

module.exports = EventThread = mongoose.model('eventThread', EventThreadSchema );
