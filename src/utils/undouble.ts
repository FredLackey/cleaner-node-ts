const isValidString = require('./is-valid-string');
const isValidArray = require('./is-valid-array');

/**
 * Replaces consecutive occurrences of specified target characters within a string with a single instance.
 * For example, undouble('a//b/c', '/') would return 'a/b/c'.
 *
 * @param {string} value - The input string to process.
 * @param {string|string[]} targets - A string or array of single characters to "undouble".
 * @returns {string} The processed string with doubled target characters reduced to one.
 */
const undouble = (value, targets) => {
  if (!isValidString(value)) {
    return value;
  }
  if (!isValidArray(targets) && !isValidString(targets)) {
    return value;
  }
  targets = isValidArray(targets) ? targets : targets.split('');
  targets = targets.filter((ch) => isValidString(ch));
  targets.forEach((ch) => {

    while (value.includes(ch + ch)) {
      value = value.replace(ch + ch, ch);
    }
  
  });
  return value;
};

module.exports = undouble;
