const isValidString = require('./is-valid-string');
const isDigits = require('./is-digits');

const EARLIEST_YEAR = 1900;

/**
 * Checks if a string represents a valid date in YYYY/MM/DD or YYYY-MM-DD format.
 * Performs basic range checks on year, month, and day.
 * Allows optional constraints on the earliest acceptable year and whether future dates are allowed.
 *
 * @param {string} value - The date string to validate.
 * @param {boolean} [allowFuture=false] - If true, dates in the future are considered valid. Defaults to false.
 * @param {number} [earliestYear=1900] - The minimum acceptable year. Defaults to 1900.
 * @returns {boolean} True if the string is a valid short date according to the criteria, false otherwise.
 */
const isValidShortDate = (value, allowFuture = false, earliestYear = EARLIEST_YEAR) => {
  if (!isValidString(value)) {
    return false;
  }
  const parts = (value.includes('/') ? value.split('/') : value.split('-')).filter(isDigits);
  if (parts.length !== 3) {
    return false;
  }
  const [year, month, day] = parts;
  if (Number(year) < earliestYear) {
    return false;
  }
  if (!allowFuture && Number(year) > new Date().getFullYear()) {
    return false;
  }
  if (Number(month) < 1 || Number(month) > 12) {
    return false;
  }
  if (Number(day) < 1 || Number(day) > 31) {
    return false;
  }
  return true;
};

module.exports = isValidShortDate;
