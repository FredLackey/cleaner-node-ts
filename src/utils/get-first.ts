const getArrayCount     = require('./get-array-count');
const isValidString = require('./is-valid-string');

/**
 * Gets the first element of an array or the first character of a string.
 * Optionally trims the string before extracting the first character.
 * @param {Array|string} value The array or string.
 * @param {boolean} [trim=false] If true and the input is a string, trim whitespace before getting the first character.
 * @returns {any|string|undefined} The first element of the array, the first character of the string (or empty string if trimmed input is empty), or undefined if the input is not a non-empty array or a valid string.
 */
const getFirst = (value, trim = false) => {

  if (isValidString(value, true)) {
    if (trim) {
      value = value.trim();
    }
    return value.length > 0
      ? value[0]
      : '';
  }

  return getArrayCount(value) > 0
    ? value[0]
    : undefined;
};

module.exports = getFirst;
