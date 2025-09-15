const isSet = require('./is-set');
const isBoolean = require('./is-boolean');

/**
 * Checks if a value is either not set (null or undefined) or is a boolean (true or false).
 * Useful for optional boolean parameters.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is not set or is a boolean, false otherwise.
 */
const isBooleanIfSet = value => {
  return !isSet(value) || isBoolean(value);
};

module.exports = isBooleanIfSet;
