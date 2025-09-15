/**
 * Checks if a value is an async function.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a function and its constructor name is 'AsyncFunction', false otherwise.
 */
const isAsync = value => (
  typeof value === 'function' && 
  value.constructor.name === 'AsyncFunction'
);

module.exports = isAsync;
