const cleanString = require('./clean-string');
const { ALPHANUMERIC }  = require('../constants');

/**
 * Removes all characters from a string except for letters and numbers.
 * @param {any} value The input value to clean.
 * @returns {string} The cleaned string containing only alphanumeric characters, or an empty string if the input is invalid.
 */
const cleanAlphanumeric = value => {
  return cleanString(value, ALPHANUMERIC);
};

module.exports = cleanAlphanumeric;
