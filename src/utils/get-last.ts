const getArrayCount     = require('./get-array-count');
const isValidString = require('./is-valid-string');

/**
 * Gets the last element of an array or the last character of a string.
 * Optionally trims the string before extracting the last character.
 * @param {Array|string} value The array or string.
 * @param {boolean} [trim=false] If true and the input is a string, trim whitespace before getting the last character.
 * @returns {any|string|undefined} The last element of the array, the last character of the string (or empty string if trimmed input is empty), or undefined if the input is not a non-empty array or a valid string.
 */
const getLast = (value, trim = false) => {

  if (isValidString(value, true)) {
    if (trim) {
      value = value.trim();
    }
    return value.length > 0
      ? value[value.length - 1]
      : '';
  }

  return getArrayCount(value) > 0
    ? value[value.length - 1]
    : undefined;
};

module.exports = getLast;
