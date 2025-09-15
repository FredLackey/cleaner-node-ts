const isValidString = require('./is-valid-string');

/**
 * Extracts all valid email addresses found in a string using a regular expression.
 * @param {string} value The string to search for email addresses.
 * @returns {string[]} An array of all valid email addresses found, or an empty array if none are found or the input is invalid.
 */
const getEmails = value => {
  return isValidString(value)
    ? value.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
    : [];
};

module.exports = getEmails;
