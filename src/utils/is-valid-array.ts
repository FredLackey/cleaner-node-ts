/**
 * Checks if a value is an array and optionally if it's non-empty.
 *
 * @param {*} value - The value to check.
 * @param {boolean} [isEmptyOkay=false] - If true, an empty array is considered valid. If false (default), the array must contain at least one element.
 * @returns {boolean} True if the value is an array and meets the emptiness condition, false otherwise.
 */
const isValidArray = (value, isEmptyOkay) => {
  return (typeof value === 'object') && (value instanceof Array) && (isEmptyOkay || value.length > 0);
};

module.exports = isValidArray;
