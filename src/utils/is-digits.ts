const isValidString = require('./is-valid-string');

/**
 * Checks if a string contains only numeric digits (0-9).
 * The string must be a valid, non-empty string.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is valid and contains only digits, false otherwise.
 */
const isDigits = value => {
  return isValidString(value) && 
    value
      .split('')
      .filter(ch => ('0123456789'.includes(ch))).join('') === value;
};

module.exports = isDigits;
