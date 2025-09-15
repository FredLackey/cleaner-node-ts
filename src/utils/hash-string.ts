const crypto = require('crypto');
const c = require('../constants');

const isValidString = require('./is-valid-string');
const trimToUndefined = require('./trim-to-undefined');

/**
 * Computes a hash (md5/hex by default) of a string after trimming leading/trailing whitespace.
 * @param {string} value The string to hash.
 * @returns {string|undefined} The hash string, or undefined if the input is not a valid string (even after trimming).
 */
const hashString = value => {
  if (!isValidString(value, true)) { return undefined; }
  value = trimToUndefined(value);
  return crypto.createHash(c.STRING_HMAC).update(value).digest(c.DIGEST_OPTION);
};

module.exports = hashString;
