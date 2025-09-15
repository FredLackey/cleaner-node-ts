/**
 * Sorts an array of numbers in ascending order.
 * @param {number[]} numbers The array of numbers to sort.
 * @returns {number[]} The sorted array.
 */
const sortAscending = numbers => {
  return numbers.sort((a, b) => a - b);
};

export default sortAscending;
