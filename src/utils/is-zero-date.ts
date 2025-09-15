const isDate = require('./is-date');
const isIsoDate = require('./is-iso-date');
const { ZERO_DATE } = require('../constants');

/**
 * Checks if a value represents the "zero date" (typically epoch time, Jan 1, 1970, or a predefined constant `ZERO_DATE`).
 * It handles both Date objects and ISO date strings.
 *
 * @param {Date|string} value - The value to check (either a Date object or an ISO date string).
 * @returns {boolean} True if the value represents the zero date, false otherwise.
 */
const isZeroDate = value => {
  const trueValue = isIsoDate(value) ? new Date(value) : value;
  return isDate(trueValue) && trueValue.getTime() === ZERO_DATE.getTime();
};

module.exports = isZeroDate;
