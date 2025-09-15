import isValidString from './is-valid-string';

/**
 * Checks if a string is entirely uppercase.
 * The string must be non-empty and valid.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is valid, non-empty, and entirely uppercase, false otherwise.
 */
const isCaps = (value: any): boolean => {
  return isValidString(value, false) && value === value.toUpperCase();
};

export default isCaps;
