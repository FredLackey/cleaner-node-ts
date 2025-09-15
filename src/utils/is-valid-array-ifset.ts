const isSet = require('./is-set');
const isValidArray = require('./is-valid-array');

/**
 * Checks if a value is either not set (null or undefined) or is a valid array.
 * This is useful for optional array parameters.
 *
 * @param {*} value - The value to check.
 * @param {boolean} [isEmptyOkay=false] - Passed to `isValidArray`. If true, an empty array is considered valid.
 * @returns {boolean} True if the value is not set or is a valid array (considering `isEmptyOkay`), false otherwise.
 */
const isValidArrayIfSet = (value, isEmptyOkay) => {
  return !isSet(value) || isValidArray(value, isEmptyOkay);
};

module.exports = isValidArrayIfSet;
