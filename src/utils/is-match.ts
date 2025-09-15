/**
 * Compares two strings for equality with options for case sensitivity and whitespace trimming.
 *
 * @param {string} source - The first string to compare.
 * @param {string} target - The second string to compare.
 * @param {boolean} caseSensitive - If true, the comparison is case-sensitive.
 * @param {boolean} matchWhitespace - If true, leading/trailing whitespace is considered in the comparison. If false, strings are trimmed before comparing.
 * @returns {boolean} True if the strings match according to the specified options, false otherwise.
 * @throws {Error} If an unexpected combination of internal logic states occurs (should not happen).
 */
const isMatch = (source, target, caseSensitive, matchWhitespace) => {

  let result = null;


  if (caseSensitive && matchWhitespace) {
    result = (source === target);
  }

  if (!caseSensitive && !matchWhitespace) {
    result = (source.trim().toLowerCase() === target.trim().toLowerCase());
  }

  if (!caseSensitive && matchWhitespace) {
    result = (source.toLowerCase() === target.toLowerCase());
  }

  if (caseSensitive && !matchWhitespace) {
    result = (source.trim() === target.trim());
  }

  if (result === true) { 
    return true;
  } if (result === false) {
    return false;
  } 
    throw new Error('Match failure.');
  

};

module.exports = isMatch;
