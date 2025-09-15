const isValidString = require('./is-valid-string');

/**
 * Checks if a string is entirely lowercase.
 * The string must be non-empty and valid.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is valid, non-empty, and entirely lowercase, false otherwise.
 */
const isLowerCase = value => {
  return isValidString(value, false) && value === value.toLowerCase();
};

module.exports = isLowerCase;
