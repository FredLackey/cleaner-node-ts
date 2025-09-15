const isAlphanumeric = require('./is-alphanumeric');

/**
 * Checks if a value is a valid UID format.
 * A valid UID must be exactly 32 characters long and contain only alphanumeric characters.
 * 
 * @param {string} value - The value to check.
 * @returns {boolean} True if the value is a valid UID format, false otherwise.
 */
const isUidFormat = value => {
  if (!isAlphanumeric(value)) {
    console.debug(`isUidFormat: value is not alphanumeric: "${value}"`);
    return false;
  }
  if (value.length !== 32) {
    console.debug(`isUidFormat: value is not 32 characters long "${value}" (${value.length} actual)`);
    return false;
  }
  return true;
};

module.exports = isUidFormat;
