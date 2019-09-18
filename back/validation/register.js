const Validator = require('validator');
const isEmpty = require('./is-empty.js');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // If user leaves empty field we turn it into empty string
  // so that Validator.isEmpty() could validate it
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Name length should be between 2 and 30 characters
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  // Name shouldn't be empty
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  // Email should be in correct format
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Email shouldn't be empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // Password shouldn't be empty
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  // Password length should be between 6 and 30 characters
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  // Password and password2 fields should match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  // Password2 shouldn't be empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm passport field is required';
  }

  return {
    errors: errors,
    // Check if errors is an empty object
    // We can't use Validator.isEmpty() because it checks only strings
    // If everything is ok errors object will still be empty in the end
    isValid: isEmpty(errors)
  };
};
