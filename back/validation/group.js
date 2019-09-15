const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Group's handle field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
