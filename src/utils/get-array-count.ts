const isValidArray = require('./is-valid-array');

const EMPTY_OK = true;

/**
 * Gets the length of an array.
 * Handles non-array inputs gracefully.
 * @param {any} value The value to check, expected to be an array.
 * @returns {number} The length of the array if it's a valid array (including empty), otherwise -1.
 */
const getArrayCount = value => {
  return isValidArray(value, EMPTY_OK)
    ? value.length
    : -1;
};

module.exports = getArrayCount;
