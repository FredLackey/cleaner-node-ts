const trimString = require('./trim-string');
const isValidString = require('./is-valid-string');

const EMPTY_OK = false;

/**
 * Trims leading and trailing whitespace from a string.
 * If the resulting string is empty or the input was not a valid string, it returns undefined.
 *
 * @param {string} value - The string to trim.
 * @returns {string|undefined} The trimmed string, or undefined if the result is empty or the input was invalid.
 */
const trimToUndefined = value => {
  value = trimString(value);
  return isValidString(value, EMPTY_OK) ? value : undefined;
};
module.exports = trimToUndefined;
