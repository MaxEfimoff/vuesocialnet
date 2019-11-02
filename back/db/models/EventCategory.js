// Event Category Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventCategorySchema = new Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: String
});

module.exports = EventCategory =mongoose.model('eventCategory', EventCategorySchema);
