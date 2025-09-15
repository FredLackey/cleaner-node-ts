/**
 * Sorts an array of numbers in descending order.
 * @param {number[]} numbers The array of numbers to sort.
 * @returns {number[]} The sorted array.
 */
const sortDescending = numbers => {
  return numbers.sort((a, b) => b - a);
};

module.exports = sortDescending;
