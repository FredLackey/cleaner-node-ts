const isNumber = require('./is-number');
const isDigits = require('./is-digits');

/**
 * Converts a Unix epoch timestamp (seconds since Jan 1, 1970) to a JavaScript Date object.
 * Handles both number and string representations of the epoch time.
 * @param {number|string} value The epoch timestamp (in seconds).
 * @returns {Date|null} The corresponding Date object, or null if the input is invalid.
 */
const fromEpoch = (value) => {
  if (!isNumber(value) || !isDigits(`${value}`)) {
    return null;
  }
  const ms = Number(value) * 1000;
  const date = new Date(ms);
  return date;
};

module.exports = fromEpoch;
