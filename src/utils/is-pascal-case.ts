const isValidString = require('./is-valid-string');
const toPascalCase = require('./to-pascal-case');

/**
 * Checks if a string is in PascalCase (UpperCamelCase) format.
 * It verifies this by converting the string to PascalCase and comparing it to the original.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is already in PascalCase format, false otherwise.
 */
const isPascalCase = value => {
  return isValidString(value) && value === toPascalCase(value);
};

module.exports = isPascalCase;
