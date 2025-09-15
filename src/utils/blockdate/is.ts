const parse = require('./parse');
const isObject = require('../is-object');

const MAX_YEAR = (new Date()).getFullYear();

/**
 * Checks if a value is a valid blockdate string.
 * @param {string} value The value to check.
 * @param {number} [maxYear=current year] The maximum allowed year.
 * @returns {boolean} True if the value is a valid blockdate string, false otherwise.
 */
const isBlockDate = (value, maxYear = MAX_YEAR) => {
  const item = parse(value, maxYear);
  return isObject(item);
};

module.exports = isBlockDate;
