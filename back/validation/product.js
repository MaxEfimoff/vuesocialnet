const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
    errors.text = "Product description must be between 10 and 1000 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = "Product image field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
