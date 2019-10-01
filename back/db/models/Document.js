// Document Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  // User is associated with the document
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  document: {
    type: String,
    required: true
  },
  // Docunemt date
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Document = mongoose.model("document", DocumentSchema);
