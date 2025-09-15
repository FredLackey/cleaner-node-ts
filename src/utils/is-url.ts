const isValidString = require('./is-valid-string');

/**
 * Checks if a string is a valid URL.
 * Requires the string to start with 'http://' or 'https://', be trimmed of whitespace,
 * and be parseable by the native `URL` constructor.
 *
 * @param {string} value - The string to validate as a URL.
 * @returns {boolean} True if the string is a valid URL according to the criteria, false otherwise.
 */
const isUrl = value => {
  if (!isValidString(value)) return false;
  value = value.toLowerCase();
  if (value !== value.trim()) {
    return false;
  }
  if (!value.startsWith('http://') && !value.startsWith('https://')) {
    return false;
  }
  try {
    const url = new URL(value);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = isUrl;
