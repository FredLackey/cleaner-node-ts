const isDate   = require('./is-date');
const isNumber = require('./is-number');

/**
 * Adds a specified number of minutes to a date.
 * @param {Date} value The original date.
 * @param {number} quantity The number of minutes to add.
 * @returns {Date|undefined} A new Date object with the minutes added, or undefined if inputs are invalid.
 */
const addMinutes = (value, quantity) => {
  return (isDate(value) && isNumber(quantity))
    ? new Date(value.getTime() + quantity * 60000)
    : undefined;
};

module.exports = addMinutes;
