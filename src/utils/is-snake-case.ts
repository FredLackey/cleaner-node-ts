const isValidString = require('./is-valid-string');
const toSnakeCase = require('./to-snake-case');

/**
 * Checks if a string is in snake_case format.
 * It verifies this by converting the string to snake_case and comparing it to the original.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is already in snake_case format, false otherwise.
 */
const isSnakeCase = value => {
  return isValidString(value) && value === toSnakeCase(value);
};

module.exports = isSnakeCase;
