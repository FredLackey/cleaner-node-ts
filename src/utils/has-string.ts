/**
 * Checks if a string contains a target substring, with optional case sensitivity.
 * @param {string} value The string to search within.
 * @param {string} target The substring to search for.
 * @param {boolean} [isCaseSensitive=false] Determines if the search should be case-sensitive.
 * @returns {boolean} True if the target substring is found, false otherwise or if inputs are not strings.
 */
const hasString = (value, target, isCaseSensitive = false) => {
  if (typeof value !== 'string') { return false; }
  if (typeof target !== 'string') { return false; }
  return (isCaseSensitive && value.indexOf(target) >= 0) ||
    (value.toUpperCase().indexOf(target.toUpperCase()) >= 0);
};

module.exports = hasString;
