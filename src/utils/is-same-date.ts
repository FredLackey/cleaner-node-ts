const isDate = require('./is-date');

/**
 * Checks if two values are both valid Date objects and represent the exact same point in time.
 *
 * @param {*} date1 - The first value to compare.
 * @param {*} date2 - The second value to compare.
 * @returns {boolean} True if both are Dates and their millisecond timestamps are equal, false otherwise.
 */
const isSameDate = (date1, date2) => {
  if (!isDate(date1) || !isDate(date2)) {
    return false;
  }
  return date1.getTime() === date2.getTime();
};

module.exports = isSameDate;
