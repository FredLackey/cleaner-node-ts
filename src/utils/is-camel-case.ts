import isValidString from './is-valid-string';
import toCamelCase from './to-camel-case';

/**
 * Checks if a string is in camelCase format.
 * It verifies this by converting the string to camelCase and comparing it to the original.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is already in camelCase format, false otherwise.
 */
const isCamelCase = value => {
  return isValidString(value) && value === toCamelCase(value);
};

export default isCamelCase;
