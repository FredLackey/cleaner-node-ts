const isValidString = require('./is-valid-string');

/**
 * Removes a specified suffix from the end of a string, potentially multiple times.
 * Returns the original string if the input value or suffix is not a valid string (empty strings are allowed).
 *
 * @param {string} value - The string to remove the suffix from.
 * @param {string} suffix - The suffix to remove.
 * @returns {string} The string with the suffix removed, or the original string if conditions aren't met.
 */
const removeSuffix = (value, suffix) => {
  if (!isValidString(value, true)) { return value; }
  if (!isValidString(suffix, true)) { return value; }
  while (value.length >= suffix.length && value.endsWith(suffix)) {
    value = value.substr(0, value.length - suffix.length);
  }
  return value;
};

module.exports = removeSuffix;
