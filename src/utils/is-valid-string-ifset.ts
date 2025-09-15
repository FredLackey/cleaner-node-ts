const isSet = require('./is-set');
const isValidString = require('./is-valid-string');

/**
 * Checks if a value is either not set (null or undefined) or is a valid string.
 * Useful for optional string parameters.
 *
 * @param {*} value - The value to check.
 * @param {boolean} [isEmptyOkay=false] - Passed to `isValidString`. If true, an empty string is considered valid.
 * @returns {boolean} True if the value is not set or is a valid string (considering `isEmptyOkay`), false otherwise.
 */
const isValidStringIfSet = (value, isEmptyOkay) => {
  return !isSet(value) || isValidString(value, isEmptyOkay);
};

module.exports = isValidStringIfSet;
