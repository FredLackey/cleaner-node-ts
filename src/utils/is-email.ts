const isValidString = require('./is-valid-string');
const getEmail = require('./get-email');

/**
 * Checks if a string is a valid email address format.
 * It uses `getEmail` to potentially clean the input and then compares it to the original value.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string matches the cleaned email format, false otherwise.
 */
const isEmail = value => {
  const email = getEmail(value);
  return isValidString(email) && value === email;
};

module.exports = isEmail;
