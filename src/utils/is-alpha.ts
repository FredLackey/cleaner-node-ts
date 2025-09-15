const isValidString = require('./is-valid-string');

/**
 * Checks if a string contains only alphabetic characters (a-z, case-insensitive).
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is valid and contains only letters, false otherwise.
 */
const isAlpha = value => {
  return isValidString(value) && 
    value
      .toLowerCase()
      .split('')
      .filter(ch => ('abcdefghijklmnopqrstuvwxyz'.includes(ch))).join('') === value.toLowerCase();
};

module.exports = isAlpha;
