const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category = mongoose.model('category', CategorySchema);
