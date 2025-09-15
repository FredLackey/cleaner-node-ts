import crypto from 'crypto';
import c from '../constants';

import isValidString from './is-valid-string';
import trimToUndefined from './trim-to-undefined';

/**
 * Computes a hash (md5/hex by default) of a string after trimming leading/trailing whitespace.
 * @param {string} value The string to hash.
 * @returns {string|undefined} The hash string, or undefined if the input is not a valid string (even after trimming).
 */
const hashString = (value: any): string | undefined => {
  if (!isValidString(value, true)) { return undefined; }
  value = trimToUndefined(value);
  return crypto.createHash(c.STRING_HMAC).update(value).digest(c.DIGEST_OPTION as crypto.BinaryToTextEncoding);
};

export default hashString;
