import isValidString from './is-valid-string';

const EMPTY_OK = true;

/**
 * Trims leading and trailing whitespace from a string.
 * If the input is not a valid string (including empty strings), it returns an empty string.
 *
 * @param {string} value - The string to trim.
 * @returns {string} The trimmed string, or an empty string if the input was invalid.
 */
const trimString = (value: any): string => {
  return isValidString(value, EMPTY_OK)
    ? value.trim()
    : '';
};
export default trimString;
