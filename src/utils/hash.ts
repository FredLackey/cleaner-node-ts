import crypto from 'crypto';
import c from '../constants';

/**
 * Computes an HMAC hash of a value using a salt.
 * @param {string|Buffer|DataView} value The value to hash.
 * @param {string|Buffer|TypedArray|DataView|KeyObject} salt The salt to use for the HMAC.
 * @param {string} [hmacOption=c.HMAC_OPTION] The HMAC algorithm (e.g., 'sha256'). Defaults to constant `HMAC_OPTION`.
 * @param {string} [digestOption=c.DIGEST_OPTION] The encoding for the output hash (e.g., 'hex', 'base64'). Defaults to constant `DIGEST_OPTION`.
 * @returns {string} The computed HMAC hash.
 */
const hash = (value: string | Buffer | DataView, salt: string | Buffer | NodeJS.TypedArray | DataView | crypto.KeyObject, hmacOption: string = c.HMAC_OPTION, digestOption: string = c.DIGEST_OPTION): string => {
  const hmac = crypto.createHmac(hmacOption, salt);
  return hmac.update(value).digest(digestOption);
};

export default hash;
