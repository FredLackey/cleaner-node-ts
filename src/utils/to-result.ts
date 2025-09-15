const isValidArray = require('./is-valid-array');
const getFirst = require('./get-first');

const EMPTY_OK = true;

/**
 * Returns a single item or an array based on the sample array
 * @param {Array} result - The result array
 * @param {Array} sample - The sample array
 * @returns {Array} The result array
 */
const toResult = (result, sample) => {
  if (isValidArray(sample, EMPTY_OK) === isValidArray(result, EMPTY_OK)) {
    return result;
  }
  return isValidArray(sample, EMPTY_OK)
    ? [result]
    : getFirst(result);
};

module.exports = toResult;
