/**
 * Checks if a value is neither null nor undefined.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is not null and not undefined, false otherwise.
 */
const isSet = value => {
  return (value !== null && (typeof value !== 'undefined'));
};

module.exports = isSet;
