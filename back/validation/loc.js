const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateLocInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 30 })) {
    errors.text = "Location must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
