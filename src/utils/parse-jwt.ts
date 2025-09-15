const isValidString = require('./is-valid-string');
const isObject      = require('./is-object');
const jwt           = require('./jwt');

const IGNORE_EXPIRATION = true;
const ENFORCE_EXPIRATION = false;

/**
 * Parses a JSON Web Token (JWT) string and returns an object with details about the token.
 * It decodes the claims, converts them to a payload object, verifies the signature (if a secret is provided),
 * and checks if the token is expired.
 *
 * @param {string} token - The JWT string to parse.
 * @param {string} [secret=''] - The secret key to verify the token's signature. If empty, signature verification is skipped.
 * @returns {object} An object containing information about the parsed token.
 * @returns {string|null} return.token - The original token string, or null if the input was invalid.
 * @returns {object|null} return.claims - The decoded claims from the token, or null if decoding failed.
 * @returns {object|null} return.payload - The payload derived from the claims (often the main data), or null if claims are invalid.
 * @returns {boolean} return.isValid - True if the token signature was successfully verified (requires a secret), false otherwise.
 * @returns {boolean} return.isExpired - True if the token signature is valid but the token has passed its expiration time (requires a secret), false otherwise.
 */
const parseJwt = (token, secret = '') => {

  const claims     = isValidString(token) ? jwt.decode(token) : null;
  const payload    = isObject(claims) ? jwt.fromClaims(claims) : null;
  const verified   = (claims && secret) ? jwt.verify(token, secret, IGNORE_EXPIRATION) : null;
  const isValid    = isObject(verified);
  const notExpired = (claims && secret) ? jwt.verify(token, secret, ENFORCE_EXPIRATION) : null;
  const isExpired  = isValid && !isObject(notExpired);

  const result = {
    token: isValidString(token) ? token : null,
    claims,
    payload,
    isValid,
    isExpired
  };

  return result;
};

module.exports = parseJwt;
