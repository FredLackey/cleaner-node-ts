/**
 * Checks if a value is strictly true or false.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is exactly true or false, false otherwise.
 */
const isBoolean = value => {
  return (value === true) || (value === false);
};

module.exports = isBoolean;
