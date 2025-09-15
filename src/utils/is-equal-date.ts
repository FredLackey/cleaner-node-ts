const isDate = require('./is-date');

/**
 * Checks if two values are both valid Date objects and represent the exact same point in time.
 * Alias for `isSameDate` (or potentially reversed logic depending on intent, functionally identical).
 *
 * @param {*} a - The first value to compare.
 * @param {*} b - The second value to compare.
 * @returns {boolean} True if both are valid Dates and their millisecond timestamps are equal, false otherwise.
 */
const isEqualDate = (a, b) => {
  return isDate(a) && isDate(b) && a.getTime() === b.getTime();
};

module.exports = isEqualDate;
