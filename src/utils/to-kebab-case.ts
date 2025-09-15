/**
 * Converts a string to kebab-case.
 * Handles various casing formats like camelCase, PascalCase, and strings with acronyms.
 * Uses a regex to split the string into parts and joins them with hyphens.
 *
 * @param {string} value - The string to convert.
 * @returns {string} The kebab-case version of the string.
 */
const toKebabCase = value => {
  return value 
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
};

module.exports = toKebabCase;
