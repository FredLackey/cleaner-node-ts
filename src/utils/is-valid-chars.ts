import c from '../constants';
import isValidString from './is-valid-string';
import cleanString from './clean-string';

const EMPTY_OK = false;

/**
 * Checks if a string contains only characters from a specified set of valid characters.
 * It cleans the string using `cleanString` with the provided valid/invalid characters and case sensitivity, 
 * then compares the cleaned string to the original.
 *
 * @param {string} value - The string to validate.
 * @param {string} [valid=c.ALPHANUMERIC] - A string containing all allowed characters. Defaults to alphanumeric.
 * @param {string} [invalid=''] - A string containing characters explicitly disallowed (not typically used with `valid`).
 * @param {boolean} [isCaseSensitive=false] - If true, validation is case-sensitive. Defaults to false.
 * @returns {boolean} True if the string is valid (non-empty) and contains only allowed characters, false otherwise.
 */
const isValidChars = (value: any, valid: string = c.ALPHANUMERIC, invalid: string = '', isCaseSensitive: boolean = false): boolean => {
  return isValidString(value, EMPTY_OK) && (value === cleanString(value, valid, invalid, isCaseSensitive));
};

export default isValidChars;
