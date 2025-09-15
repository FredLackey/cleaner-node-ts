const isValidString = require('./is-valid-string');
const toKebabCase = require('./to-kebab-case');

/**
 * Checks if a string is in kebab-case format.
 * It verifies this by converting the string to kebab-case and comparing it to the original.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is already in kebab-case format, false otherwise.
 */
const isKebabCase = value => {
  return isValidString(value) && value === toKebabCase(value);
};

module.exports = isKebabCase;
