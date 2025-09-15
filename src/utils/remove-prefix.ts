const isValidString = require('./is-valid-string');

/**
 * Removes a specified prefix from the beginning of a string, potentially multiple times.
 * If the string consists only of the prefix, an empty string is returned.
 * Returns the original string if the input value or prefix is not a valid string (empty strings are allowed).
 *
 * @param {string} value - The string to remove the prefix from.
 * @param {string} prefix - The prefix to remove.
 * @returns {string} The string with the prefix removed, or the original string if conditions aren't met.
 */
const removePrefix = (value, prefix) => {
  if (!isValidString(value, true)) { return value; }
  if (!isValidString(prefix, true)) { return value; }
  while (value.length >= prefix.length && value.startsWith(prefix)) {
    if (value === prefix) { 
      value = ''; 
    }
    else {
      value = value.substr(prefix.length);    
    }
  }
  return value;
};

module.exports = removePrefix;
