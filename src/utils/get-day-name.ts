const isDate = require('./is-date');
const isIsoDate = require('./is-iso-date');
const fromIso = require('./from-iso-date');

/**
 * Gets the full name of the day of the week (e.g., 'Sunday', 'Monday') for a given Date object or ISO date string.
 * @param {Date|string} date The Date object or ISO 8601 date string.
 * @returns {string|undefined} The full name of the day, or undefined if the input is invalid.
 */
const getDayName = (date) => {

  if (!isDate(date) && !isIsoDate(date)) {
    return undefined;
  }

  if (isIsoDate(date)) {
    date = fromIso(date);
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};

module.exports = getDayName;
