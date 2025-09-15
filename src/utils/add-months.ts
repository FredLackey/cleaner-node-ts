const isDate = require('./is-date');
const isNumber = require('./is-number');

/**
 * Adds a specified number of months to a date.
 * @param {Date} value The original date.
 * @param {number} quantity The number of months to add.
 * @returns {Date|undefined} A new Date object with the months added, or undefined if inputs are invalid.
 */
const addMonths = (value, quantity) => {
  if (!isDate(value) || !isNumber(quantity)) {
    return undefined;
  }

  const targetDate = new Date(Date.UTC(
    value.getUTCFullYear(),
    value.getUTCMonth(),
    value.getUTCDate(),
    value.getUTCHours(),
    value.getUTCMinutes(),
    value.getUTCSeconds(),
    value.getUTCMilliseconds()
  ));

  const originalDay = targetDate.getUTCDate();
  targetDate.setUTCMonth(targetDate.getUTCMonth() + quantity, 1);

  const lastDayOfTargetMonth = new Date(Date.UTC(
    targetDate.getUTCFullYear(),
    targetDate.getUTCMonth() + 1,
    0
  )).getUTCDate();

  targetDate.setUTCDate(Math.min(originalDay, lastDayOfTargetMonth));

  return targetDate;
};

module.exports = addMonths;
