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
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('Image', imagesSchema);
