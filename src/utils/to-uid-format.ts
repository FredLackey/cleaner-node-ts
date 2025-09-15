const { ALPHANUMERIC } = require('../constants');
const cleanString      = require('./clean-string');
const isGuidFormat     = require('./is-guid-format');
const isUidFormat      = require('./is-uid-format');

/**
 * Converts a value to a standardized UID format (32 uppercase alphanumeric characters).
 * It accepts values that are already in UID format or GUID format.
 * If the input value is not in either format, it returns null.
 * Otherwise, it cleans the string by removing non-alphanumeric characters and converts it to uppercase.
 *
 * @param {string} value - The value to convert (expected to be in UID or GUID format).
 * @returns {string|null} The formatted UID string (32 uppercase alphanumeric chars) or null if the input is invalid.
 */
const toUidFormat = value => {
  return isUidFormat(value) || isGuidFormat(value)
    ? cleanString(value, ALPHANUMERIC).toUpperCase()
    : null;
};

module.exports = toUidFormat;
