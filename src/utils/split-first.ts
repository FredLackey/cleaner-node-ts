const isValidString = require('./is-valid-string');

/**
 * Splits a string at the first occurrence of a specified separator.
 * Returns an array containing the part before the separator and the part after.
 * If the separator is not found, the array contains the original string as the only element.
 * Throws an error if the input string or separator is invalid or empty.
 *
 * @param {string} str - The string to split.
 * @param {string} separator - The separator string to split by.
 * @returns {string[]} An array containing one or two parts of the split string.
 * @throws {Error} If `str` or `separator` is not a non-empty valid string.
 */
const splitFirst = (str, separator) => {

  if (!isValidString(str, true) || str.length === 0) {
    throw new Error('Invalid string supplied to splitFirst()');
  }
  if (!isValidString(separator, true) || separator.length === 0) {
    throw new Error('Invalid separator supplied to splitFirst()');
  }

  const pos = str.indexOf(separator);
  if (pos === -1) {
    return [str];
  }

  const first = str.slice(0, pos);
  if (str.length === first.length || separator.length === 0) {
    return [first];
  }

  const rest = str.slice(pos + separator.length);
  return [first, rest];

};

module.exports = splitFirst;
