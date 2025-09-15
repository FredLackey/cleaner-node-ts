import isDate from './is-date';
import isNumber from './is-number';
import addMonths from './add-months';

/**
 * Adds a specified number of years to a date.
 * @param {Date} value The original date.
 * @param {number} quantity The number of years to add.
 * @returns {Date|undefined} A new Date object with the years added, or undefined if inputs are invalid.
 */
const addYears = (value, quantity) => {
  if (!isDate(value) || !isNumber(quantity)) {
    return undefined;
  }

  return addMonths(value, quantity * 12);
};

export default addYears;
