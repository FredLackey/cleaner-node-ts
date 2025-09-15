const isDate   = require('./is-date');
const isNumber = require('./is-number');

/**
 * Adds a specified number of days to a date.
 * @param {Date} value The original date.
 * @param {number} quantity The number of days to add.
 * @returns {Date|undefined} A new Date object with the days added, or undefined if inputs are invalid.
 */
const addDays = (value, quantity) => {
  return (isDate(value) && isNumber(quantity))
    ? new Date(value.getTime() + quantity * 86400000)
    : undefined;
};

module.exports = addDays;
