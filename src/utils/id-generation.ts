/**
 * ID and code generation utilities
 */

import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';
import { ALPHANUMERIC, ALPHA_UPPER, DIGITS } from '../constants';

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
  const chars = ALPHA_UPPER + DIGITS;
  let result = '';

  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * Generates a random code string of a specified length using given characters
 */
export function newCode(length = 8, chars = ALPHANUMERIC): string {
  if (length <= 0) return '';
  if (!chars || chars.length === 0) return '';

  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * Generates a cryptographically random salt string
 */
export function newSalt(length = 32): string {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}
