const isNumber = require('./is-number');

/**
 * Comparison function for sorting numbers in ascending order.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} Negative if a < b, positive if a > b, zero if a === b.
 */
const sortAscending = (a, b) => {
  return (a - b);
};
/**
 * Comparison function for sorting numbers in descending order.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} Negative if b < a, positive if b > a, zero if a === b.
 */
const sortDescending = (a, b) => {
  return (b - a);
};

/**
 * Sorts an array containing numbers (or string representations of numbers).
 * Non-numeric values are filtered out before sorting.
 * Returns a new array with the numbers sorted either ascending (default) or descending.
 *
 * @param {Array<any>} values - The array containing potential numbers.
 * @param {boolean} [descending=false] - If true, sorts in descending order. Defaults to false (ascending).
 * @returns {number[]} A new array containing the sorted numbers.
 */
const sort = (values, descending = false) => {

  const digits = [].concat(values).filter(x => (isNumber(x))).map(x => (Number(x)));
  
  if (descending) {
    digits.sort(sortDescending);
  } else {
    digits.sort(sortAscending);
  }

  return digits;
};

module.exports = sort;
