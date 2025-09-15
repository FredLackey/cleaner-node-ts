const path = require('path');
const isValidArray = require('./is-valid-array');
const isValidString = require('./is-valid-string');
const getSubstring = require('./get-substring');

/**
 * Finds the common root path (e.g., 'C:\\' or '/') from an array of file paths.
 * @param {string[]} values An array of file path strings.
 * @returns {string|null} The common root path if all paths share the same root, otherwise null.
 * @private
 */
const getRoot = values => {
  if (!isValidArray(values)) { 
    return null; 
  }
  const result = [];
  values.forEach(value => {
    try {
      const { root } = path.parse(value);
      if (!result.includes(root)) { 
        result.push(root); 
      }
    } catch (ex) {
      return null;
    }
  });
  return (result.length === 1) ? result[0] : null;
};

/**
 * Finds the longest common base directory path from an array of file paths.
 * Ensures all paths share the same root directory before finding the common subdirectory path.
 * Handles different path separators (Windows/Unix).
 * @param {string[]} values An array of file path strings.
 * @returns {string|null} The longest common base directory path, or null if paths don't share a common root or if the input is invalid.
 */
const getBaseDir = (values) => {
  
  if (!isValidArray(values)) { 
    return null; 
  }
  if (values.length === 1) { 
    return values[0]; 
  }
  const root = getRoot(values);
  if (!isValidString(root)) {
    return null;
  }
  const endChar = (root.length === 3 && root.endsWith(':\\')) 
    ? '\\'
    : (root.length === 1)
      ? root
      : (root === '\\\\')
        ? '\\\\'
        : undefined;
  if (!isValidString(endChar)) {
    return null;
  }
  const _dirs = values
    .filter(value => (value.toLowerCase().startsWith(root)))
    .map(value => (value.endsWith(endChar) ? value : (value + endChar)));
  if (_dirs.length !== values.length) {
    return null;
  }
  let substring = getSubstring(_dirs, true);
  while (isValidString(substring) && !substring.endsWith(endChar)) {
    if (substring === endChar) { 
      substring = ''; 
    }
    else {
      substring = substring(0, substring.length - 1);
    }
  }
  return substring;
};

module.exports = getBaseDir;
