const jwt               = require('jsonwebtoken');
const isObject          = require('./is-object');
const isValidString = require('./is-valid-string');
const isNumber          = require('./is-number');
const fromEpoch         = require('./from-epoch');
const toEpoch           = require('./to-epoch');

// return {
//   user     : toId(payload.sub),
//   account  : toId(payload.aid),
//   session  : toId(payload.iss),
//   created  : fromEpoch(payload.iat),
//   expiry   : fromEpoch(payload.exp)
// };

/**
 * Converts a value to an ID (number or string) or undefined.
 * Used internally for processing claim values.
 * 
 * @param {*} value - The value to convert.
 * @returns {number|string|undefined} The converted ID or undefined.
 */
const toId = value => {
  if (typeof value === 'undefined') { return undefined; }
  if (isNumber(value)) { return Number(value); }
  if (isValidString(value)) { return value; }
  return undefined;
};

// Defines the mapping between standard JWT claim keys and application-specific payload names,
// along with functions to convert between them.
const CLAIMS = [
  { 
    key: 'sub', 
    name: 'user', 
    fromClaim: (value) => toId(value),
    toClaim: (value) => `${value}`
  },
  { 
    key: 'aid', 
    name: 'account', 
    fromClaim: (value) => toId(value),
    toClaim: (value) => `${value}` 
  },
  { 
    key: 'iss', 
    name: 'session', 
    fromClaim: (value) => toId(value),
    toClaim: (value) => `${value}` 
  },
  { 
    key: 'iat', 
    name: 'created', 
    fromClaim: (value) => fromEpoch(value),
    toClaim: (value) => toEpoch(value) 
  },
  { 
    key: 'exp', 
    name: 'expiry', 
    fromClaim: (value) => fromEpoch(value),
    toClaim: (value) => toEpoch(value) 
  },
];

/**
 * Verifies a JWT token using a secret or public key.
 * Catches errors and returns undefined if verification fails.
 *
 * @param {string} token - The JWT token string.
 * @param {string|Buffer} secret - The secret or public key for verification.
 * @param {boolean} [ignoreExpiration=true] - If true, bypasses expiration check. Defaults to true.
 * @returns {object|undefined} The decoded payload if verification is successful, otherwise undefined.
 */
const verify = (token, secret, ignoreExpiration = true) => {
  try {
    const result = jwt.verify(token, secret, { ignoreExpiration });
    return result;
  } catch (er) {
    return undefined;
  }
};

/**
 * Decodes a JWT token without verifying the signature.
 *
 * @param {string} token - The JWT token string.
 * @returns {object|null} The decoded payload, or null if decoding fails.
 */
const decode = token => {
  return jwt.decode(token);
};
/**
 * Encodes (signs) a payload into a JWT token.
 *
 * @param {object|string|Buffer} payload - The payload to sign.
 * @param {string|Buffer} certOrSecret - The secret or private key for signing.
 * @param {object} [options] - Options for `jsonwebtoken.sign` (e.g., algorithm, expiresIn).
 * @returns {string} The generated JWT token string.
 */
const encode = (payload, certOrSecret, options) => {
  return jwt.sign(payload, certOrSecret, options);
};

/**
 * Converts a standard JWT claims object into an application-specific payload object.
 * Uses the `CLAIMS` mapping to transform keys and values.
 * Keeps unmapped claims as they are.
 *
 * @param {object} obj - The JWT claims object.
 * @returns {object|undefined} The transformed application payload object, or undefined if input is not an object.
 */
const fromClaims = obj => {

  if (!isObject(obj)) {
    return undefined;
  }

  const result  = {};
  
  Object.keys(obj).forEach(key => {
    const claim = CLAIMS.find(x => (x && x.key === key.toLocaleLowerCase()));
    if (claim) {
      result[claim.name] = claim.fromClaim(obj[key]);
    } else {
      result[key] = obj[key];
    }
  });

  return result;

};
/**
 * Converts an application-specific payload object into a standard JWT claims object.
 * Uses the `CLAIMS` mapping to transform keys and values.
 * Keeps unmapped properties as they are.
 *
 * @param {object} obj - The application payload object.
 * @returns {object|undefined} The transformed JWT claims object, or undefined if input is not an object.
 */
const toClaims = obj => {

  if (!isObject(obj)) {
    return undefined;
  }

  const result  = {};
  
  Object.keys(obj).forEach(name => {
    const claim = CLAIMS.find(x => (x && x.name === name.toLowerCase()));
    if (claim) {
      result[claim.key] = claim.toClaim(obj[name]);
    } else {
      result[name] = obj[name];
    }
  });

  return result;

};

module.exports = {
  verify,
  decode,
  encode,
  fromClaims,
  toClaims
};
