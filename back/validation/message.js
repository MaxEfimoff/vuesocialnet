const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateMessageInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Message must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
