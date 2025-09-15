const isValidString = require('./is-valid-string');
const toCamelCase = require('./to-camel-case');

/**
 * Converts a string to PascalCase (also known as UpperCamelCase).
 * First converts the string to camelCase, then capitalizes the first letter.
 * Returns an empty string if the input is not a valid string.
 *
 * @param {string} value - The string to convert.
 * @returns {string} The PascalCase version of the string, or an empty string if the input was invalid.
 */
const toPascalCase = value => {

  if (!isValidString(value)) { return ''; }

  const camelCase = toCamelCase(value);
  return camelCase.length === 1 ? camelCase.toUpperCase() : camelCase[0].toUpperCase() + camelCase.slice(1);

};

module.exports = toPascalCase;
