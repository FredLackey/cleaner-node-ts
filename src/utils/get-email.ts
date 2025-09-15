const getEmails = require('./get-emails');
const getSingle = require('./get-single');

/**
 * Extracts the first valid email address found in a string.
 * @param {string} value The string to search for email addresses.
 * @returns {string|undefined} The first valid email address found, or undefined if none are found or the input is invalid.
 */
const getEmail = value => {
  const items = getEmails(value);
  return getSingle(items);
};

module.exports = getEmail;
