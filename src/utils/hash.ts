const crypto = require('crypto');
const c = require('../constants');

/**
 * Computes an HMAC hash of a value using a salt.
 * @param {string|Buffer|DataView} value The value to hash.
 * @param {string|Buffer|TypedArray|DataView|KeyObject} salt The salt to use for the HMAC.
 * @param {string} [hmacOption=c.HMAC_OPTION] The HMAC algorithm (e.g., 'sha256'). Defaults to constant `HMAC_OPTION`.
 * @param {string} [digestOption=c.DIGEST_OPTION] The encoding for the output hash (e.g., 'hex', 'base64'). Defaults to constant `DIGEST_OPTION`.
 * @returns {string} The computed HMAC hash.
 */
const hash = (value, salt, hmacOption = c.HMAC_OPTION, digestOption = c.DIGEST_OPTION) => {
  const hmac = crypto.createHmac(hmacOption, salt);
  return hmac.update(value).digest(digestOption);
};

module.exports = hash;
