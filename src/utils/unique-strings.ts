const isValidArray  = require('./is-valid-array');
const isValidString = require('./is-valid-string');

/**
 * Filters an array to contain only unique strings, preserving the original order.
 * Non-string elements are ignored.
 * Offers options for case-sensitive comparison and trimming whitespace.
 *
 * @param {Array<any>} values - The array containing potential strings.
 * @param {boolean} [isCaseSensitive=false] - If true, comparison is case-sensitive. Defaults to false.
 * @param {boolean} [trim=true] - If true, trims whitespace from strings before comparison. Defaults to true.
 * @returns {Array<string>} A new array containing only the unique strings from the input. Returns the original input if it's not a valid array.
 */
const uniqueString = (values, isCaseSensitive = false, trim = true) => {
  if (!isValidArray(values)) { return values; }
  const result = [];
  const lower = [];
  [].concat(values).filter(isValidString).forEach(v => {
    const value = (trim ? v.trim() : v);
    if ((isCaseSensitive && result.indexOf(value) < 0) || (!isCaseSensitive && lower.indexOf(value.toLowerCase()) < 0)) {
      result.push(value);
      lower.push(value.toLowerCase());
    }
  });
  return result;
};

module.exports = uniqueString;
