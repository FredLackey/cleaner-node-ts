/**
 * Hashing functions
 */

import * as crypto from 'crypto';
import * as fs from 'fs';

/**
 * Calculates the MD5 hash of a given string value
 * @param value - String to hash
 * @returns MD5 hash as hex string, or empty string if invalid
 */
export function getHash(value: string): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  try {
    return crypto.createHash('md5').update(value).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Computes an HMAC hash of a value using a salt
 * @param value - Value to hash
 * @param salt - Salt for HMAC
 * @param algorithm - Hash algorithm (default: 'sha256')
 * @returns HMAC hash as hex string, or empty string if invalid
 */
export function hash(value: string, salt: string, algorithm = 'sha256'): string {
  if (!value || !salt) {
    return '';
  }

  if (typeof value !== 'string' || typeof salt !== 'string') {
    return '';
  }

  try {
    return crypto.createHmac(algorithm, salt).update(value).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Computes a hash (md5/hex by default) of a string
 * @param value - String to hash
 * @param algorithm - Hash algorithm (default: 'md5')
 * @returns Hash as hex string, or empty string if invalid
 */
export function hashString(value: string, algorithm = 'md5'): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  try {
    return crypto.createHash(algorithm).update(value).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Computes a hash of a file's contents synchronously
 * @param filePath - Path to the file
 * @param algorithm - Hash algorithm (default: 'md5')
 * @returns Hash as hex string, or empty string if error
 */
export function hashFile(filePath: string, algorithm = 'md5'): string {
  if (!filePath || typeof filePath !== 'string') {
    return '';
  }

  try {
    if (!fs.existsSync(filePath)) {
      return '';
    }

    const content = fs.readFileSync(filePath);
    return crypto.createHash(algorithm).update(content).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Computes a hash of file contents asynchronously
 * @param filePath - Path to the file
 * @param algorithm - Hash algorithm (default: 'md5')
 * @returns Promise resolving to hash string
 */
export async function hashFileContents(filePath: string, algorithm = 'md5'): Promise<string> {
  if (!filePath || typeof filePath !== 'string') {
    return '';
  }

  try {
    if (!fs.existsSync(filePath)) {
      return '';
    }

    const content = await fs.promises.readFile(filePath);
    return crypto.createHash(algorithm).update(content).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Computes a hash of an array of lines
 * @param lines - Array of lines to hash
 * @param algorithm - Hash algorithm (default: 'md5')
 * @returns Hash as hex string, or empty string if invalid
 */
export function hashLines(lines: string[], algorithm = 'md5'): string {
  if (!Array.isArray(lines)) {
    return '';
  }

  try {
    const content = lines.join('\n');
    return crypto.createHash(algorithm).update(content).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Generates a hash value for a given object or array
 * @param obj - Object or array to hash
 * @param algorithm - Hash algorithm (default: 'md5')
 * @returns Hash as hex string, or empty string if invalid
 */
export function hashObject(obj: unknown, algorithm = 'md5'): string {
  if (obj === null || obj === undefined) {
    return '';
  }

  try {
    const objAsRecord = obj as Record<string, unknown>;
    const str = JSON.stringify(objAsRecord, Object.keys(objAsRecord).sort());
    return crypto.createHash(algorithm).update(str).digest('hex');
  } catch {
    return '';
  }
}

/**
 * Generates a cryptographically random salt string
 * @param length - Length of the salt (default: 32)
 * @returns Random salt string
 */
export function newSalt(length = 32): string {
  try {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  } catch {
    // Fallback to less secure method
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
