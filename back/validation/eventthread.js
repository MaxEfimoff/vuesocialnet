const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateEventThreadInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";

  if (!Validator.isLength(data.title, { min: 10, max: 512 })) {
    errors.title = "Thread must be between 10 and 512 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
