const crypto = require('crypto');

/**
 * Calculates the MD5 hash of a given string value.
 * @param {string} value The string value to hash.
 * @returns {string} The MD5 hash of the value as a hexadecimal string.
 */
const getHash = value => crypto.createHash('md5').update(value).digest('hex');

module.exports = getHash;
