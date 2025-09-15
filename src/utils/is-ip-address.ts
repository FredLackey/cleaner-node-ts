const isValidString = require('./is-valid-string');

const ACCEPTABLE_IP_ADDRESS = [
  '0.0.0.0',
  'localhost'
];

/**
 * Checks if a string represents a valid IPv4 address.
 * Allows specific strings like '0.0.0.0' and 'localhost'.
 * Validates the format (four parts separated by dots) and the range of each part (0-255).
 * Also checks that the first part is not 0 (unless it's the specific '0.0.0.0' address).
 *
 * @param {string} value - The string to validate as an IP address.
 * @returns {boolean} True if the string is a valid IPv4 address or an acceptable special case, false otherwise.
 */
const isIpAddress = value => {
  if (!isValidString(value) || value.length > 15) {
    return false;
  }
  if (ACCEPTABLE_IP_ADDRESS.includes(value.toLowerCase())) {
    return true;
  }
  let parts = value.split('.');
  if (parts.length !== 4) {
    return false;
  }
  parts = parts.filter(x => {
    const p = Number(x);
    return !isNaN(p) && p >= 0 && p <= 255;
  });
  return Number(parts[0]) !== 0;
};

module.exports = isIpAddress;
