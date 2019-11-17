// Events Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  eventcategory: {
    type: Schema.Types.ObjectId,
    ref: 'eventcategory'
  },
  joinedPeople: [{
    type: Schema.Types.ObjectId,
    ref: 'profile'
  }],
  location: {
    type: String,
    required: true
  },
  processedLocation: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shortInfo: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  timeFrom: {
    type: String,
    required: true
  },
  timeTo: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  joinedPeopleCount: {
    type: Number,
    default: 0
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

module.exports = Event = mongoose.model('event', EventSchema );
