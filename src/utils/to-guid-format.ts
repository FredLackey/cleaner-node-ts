const isGuidFormat = require('./is-guid-format');
const isUidFormat  = require('./is-uid-format');

/**
 * Converts a value (potentially a GUID or UID) into the standard lowercase GUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).
 * If the value is already a valid GUID format, it's converted to lowercase.
 * If the value is a valid UID format (32 alphanumeric chars), it's formatted into a GUID string.
 * Returns undefined if the input is neither a valid GUID nor a valid UID format.
 *
 * @param {string} value - The string value to convert (expected GUID or UID format).
 * @returns {string|undefined} The formatted lowercase GUID string, or undefined if conversion is not possible.
 */
const toGuidFormat = value => {
  if (isGuidFormat(value)) { return value.toLowerCase(); }
  if (!isUidFormat(value)) { return undefined; }
  return [
    value.substr(0, 8),
    value.substr(8, 4),
    value.substr(12, 4),
    value.substr(16, 4),
    value.substr(20)
  ].join('-').toLowerCase();
};

module.exports = toGuidFormat;
