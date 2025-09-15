/**
 * Checks if a value is a function.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is of type 'function', false otherwise.
 */
const isFunction = value => (typeof value === 'function');

module.exports = isFunction;
