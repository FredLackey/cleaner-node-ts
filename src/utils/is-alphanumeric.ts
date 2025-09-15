const isValidString = require('./is-valid-string');

/**
 * Checks if a string contains only alphanumeric characters (a-z, 0-9, case-insensitive).
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is valid and contains only letters and numbers, false otherwise.
 */
const isAlphanumeric = value => {
  return isValidString(value) && 
    value
      .toLowerCase()
      .split('')
      .filter(ch => ('abcdefghijklmnopqrstuvwxyz0123456789'.includes(ch))).join('') === value.toLowerCase();
};

module.exports = isAlphanumeric;
