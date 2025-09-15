/**
 * ID and code generation utilities
 */

import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';
import { ALPHANUMERIC, ALPHA_UPPER, DIGITS, SALT_OPTION, DEFAULTS } from '../constants';

/**
 * Generates a new version 4 UUID (GUID)
 */
export function newGuid(): string {
  return uuidv4();
}

/**
 * Generates a new 32-character uppercase alphanumeric UID string
 */
export function newUid(): string {
  const guid = newGuid();
  return guid.split('-').join('').toUpperCase();
}

/**
 * Generates a random code string of a specified length using given characters
 */
export function newCode(totalLength: number = DEFAULTS.CODE.LENGTH, chars: string = DEFAULTS.CODE.CHARS): string {
  const _length = Number(totalLength);

  const rnd = randomBytes(_length);
  const value = new Array(_length);
  const len = chars.length;

  for (let i = 0; i < _length; i += 1) {
    value[i] = chars[rnd[i] % len];
  }

  return value.join('');
}

/**
 * Generates a cryptographically random salt string
 */
export function newSalt(byteCount: number, saltOption: BufferEncoding = SALT_OPTION as BufferEncoding): string {
  return randomBytes(byteCount).toString(saltOption);
}
