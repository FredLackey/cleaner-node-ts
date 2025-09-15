const isShortDate = require('./is-short-date');

/**
 * Converts a short date string (YYYY-MM-DD or YYYY/MM/DD) to a JavaScript Date object.
 * Note: The `allowFuture` and `earliestYear` parameters are currently unused in the function body, although they are present in the signature of the imported `isShortDate`.
 * @param {string} value The short date string.
 * @param {boolean} [allowFuture] - (Unused) Intended to allow dates in the future.
 * @param {number} [earliestYear] - (Unused) Intended to specify the earliest acceptable year.
 * @returns {Date|null} The corresponding Date object, or null if the input is not a valid short date string.
 */
const fromShortDate = (value, allowFuture, earliestYear) => {
  if (!isShortDate(value)) {
    return null;
  }
  const parts = (value.includes('/') ? value.split('/') : value.split('-')).map(x => Number(x));
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
};

module.exports = fromShortDate;
