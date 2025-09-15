const isIsoDate = require('./is-iso-date');

/**
 * Converts an ISO 8601 date string to a JavaScript Date object.
 * @param {string} value The ISO 8601 date string.
 * @returns {Date|null} The corresponding Date object, or null if the input is not a valid ISO date string.
 */
const fromIsoDate = (value) => {
  if (!isIsoDate(value)) { return null; }
  return new Date(Date.parse(value));
};

module.exports = fromIsoDate;
