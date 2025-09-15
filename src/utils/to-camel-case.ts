const toSnakeCase = require('./to-snake-case');

/**
 * Converts a string to camelCase.
 * First converts the string to snake_case, then transforms it to camelCase.
 * Handles single-character words and ensures the first character is lowercase.
 *
 * @param {string} value - The string to convert.
 * @returns {string} The camelCase version of the string.
 */
const toCamelCase = value => {
  value = toSnakeCase(value);
  value = value.split('_').map(x => (x.length === 1 
    ? x.toUpperCase() 
    : `${x.substr(0, 1).toUpperCase()}${x.substr(1)}`)).join('');
  return value.length === 1 
    ? value.toLowerCase() 
    : `${value.substr(0, 1).toLowerCase()}${value.substr(1)}`;
};

module.exports = toCamelCase;
