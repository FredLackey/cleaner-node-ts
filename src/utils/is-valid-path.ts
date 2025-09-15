const path = require('path');
const isValidString = require('./is-valid-string');

/**
 * Internal helper to safely get the base name of a path.
 * Catches potential errors from `path.basename`.
 * 
 * @param {string} value - The path string.
 * @returns {string|undefined} The base name or undefined if an error occurred.
 */
const getBase = value => {
  try {
    return path.basename(value);
  } catch (ex) {
    return undefined;
  }
};

/**
 * Checks if a string appears to be a valid file or folder path by checking if its basename is a valid string.
 * This is a basic check and doesn't guarantee the path exists or is accessible.
 *
 * @param {string} value - The path string to check.
 * @returns {boolean} True if the basename of the path is a non-empty string, false otherwise.
 */
const isValidPath = (value) => {
  return isValidString(getBase(value));
};

module.exports = isValidPath;
