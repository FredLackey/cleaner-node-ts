/**
 * Converts a string to snake_case.
 * Handles various casing formats like camelCase, PascalCase, and strings with acronyms.
 *
 * @param {string} value - The string to convert.
 * @returns {string} The snake_case version of the string.
 */
const toSnakeCase = value => {
  return value
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');
};  

module.exports = toSnakeCase;
