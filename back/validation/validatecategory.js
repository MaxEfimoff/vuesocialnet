const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateEventCategoryInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.image = !isEmpty(data.image) ? data.image : "";

  if (!Validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = "Event category name must be between 3 and 20 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.text = "Name field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
