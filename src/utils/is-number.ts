/**
 * Checks if a value can be interpreted as a finite number.
 * Handles both number primitives and strings that represent numbers.
 * Uses `parseFloat` and `isFinite` for the check.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a finite number, false otherwise.
 */
const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

module.exports = isNumber;
