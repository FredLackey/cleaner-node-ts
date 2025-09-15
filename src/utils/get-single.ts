const getArrayCount = require('./get-array-count');

/**
 * Returns the first element of an array if it contains exactly one element, otherwise returns undefined.
 * @param {*} value The value to check. Expected to be an array.
 * @returns {*} The first element of the array if it has a single element, otherwise undefined.
 */
const getSingle = value => {
  return getArrayCount(value) === 1
    ? value[0]
    : undefined;
};

module.exports = getSingle;
