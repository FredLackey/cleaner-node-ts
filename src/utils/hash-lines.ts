import isValidString from './is-valid-string';
import hashString from './hash-string';
import isNumber from './is-number';
import isBoolean from './is-boolean';

const ALLOW_EMPTY = true;

/**
 * Computes a hash of an array of lines (strings, numbers, or booleans).
 * Filters out invalid entries, converts numbers/booleans to strings, optionally trims whitespace from each line, joins them into a single string, and then hashes the result using `hashString` (defaulting to md5/hex).
 * @param {Array<string|number|boolean>} lines An array of values to hash.
 * @param {boolean} [trim=true] If true, trims whitespace from each valid line before joining.
 * @returns {string} The computed hash string (md5/hex), or an empty string if the input results in no valid content to hash.
 */
const hashLines = (lines: any, trim: boolean = true): string => {

  const values = [].concat(lines)
    .filter(x => (isValidString(x, ALLOW_EMPTY) || isNumber(x) || isBoolean(x)))
    .map(x => {
      return (isNumber(x) || isBoolean(x)) ? `${x}` : x;
    })
    .map(x => (trim ? x.trim() : x));

  if (values.length === 0) {
    return '';
  }

  const value = values.join('');
  if (!isValidString(value)) {
    return '';
  }

  return hashString(value);

};

export default hashLines;
