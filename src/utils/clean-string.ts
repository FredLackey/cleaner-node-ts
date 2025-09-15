import hasString from './has-string';
import isValidString from './is-valid-string';
import { ALPHANUMERIC  } from '../constants';

const EMPTY_OK = true;

/**
 * Cleans a string by keeping only specified valid characters and removing specified invalid characters.
 * @param {any} value The input value, expected to be a string.
 * @param {string} [valid=ALPHANUMERIC] A string containing all valid characters to keep.
 * @param {string} [invalid=''] A string containing invalid characters to remove.
 * @param {boolean} [isCaseSensitive=false] Whether the character matching should be case-sensitive.
 * @returns {string|undefined} The cleaned string, or undefined if the input is not a valid string.
 */
const cleanString = (value: any, valid: string = ALPHANUMERIC, invalid: string = '', isCaseSensitive: boolean = false): string | undefined => {
  if (!isValidString(value, EMPTY_OK)) { return undefined; }
  return value.split('').filter(ch => ((!valid || hasString(valid, ch, isCaseSensitive)) &&
    (!invalid || !hasString(invalid, ch, isCaseSensitive))
  )).join('');
};

export default cleanString;
