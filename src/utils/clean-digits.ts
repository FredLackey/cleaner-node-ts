const cleanString = require('./clean-string');
const { DIGITS }  = require('../constants');

/**
 * Removes all non-digit characters from a string.
 * @param {any} value The input value to clean.
 * @returns {string} The cleaned string containing only digits, or an empty string if the input is invalid.
 */
const cleanDigits = value => {
  return cleanString(value, DIGITS);
};

module.exports = cleanDigits;
