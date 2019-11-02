const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateEventInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";

  if (!Validator.isLength(data.title, { min: 10, max: 140 })) {
    errors.title = "Event description must be between 10 and 140 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = "Event image field is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (!Validator.isLength(data.description, { min: 10, max: 500 })) {
    errors.description = "Event description must be between 10 and 500 characters";
  }

  if (Validator.isEmpty(data.shortInfo)) {
    errors.shortInfo = "Short info field is required";
  }

  if (!Validator.isLength(data.shortInfo, { min: 10, max: 140 })) {
    errors.shortInfo = "Event short info must be between 10 and 140 characters";
  }

  if (Validator.isEmpty(data.timeFrom)) {
    errors.timeFrom = "Time from info field is required";
  }

  if (Validator.isEmpty(data.timeTo)) {
    errors.timeTo = "Time to info field is required";
  }


  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
