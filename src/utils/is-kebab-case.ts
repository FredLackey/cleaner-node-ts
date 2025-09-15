import isValidString from './is-valid-string';
import toKebabCase from './to-kebab-case';

/**
 * Checks if a string is in kebab-case format.
 * It verifies this by converting the string to kebab-case and comparing it to the original.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is already in kebab-case format, false otherwise.
 */
const isKebabCase = (value: any): boolean => {
  return isValidString(value) && value === toKebabCase(value);
};

export default isKebabCase;
