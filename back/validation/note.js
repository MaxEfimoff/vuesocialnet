const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateNoteInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
    errors.text = "Note text must be between 10 and 1000 characters";
  }

  if (!Validator.isLength(data.title, { min: 3, max: 20 })) {
    errors.title = "Note title must be between 3 and 20 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.text = "Title field is required";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
