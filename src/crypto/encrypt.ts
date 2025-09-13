/**
 * Encryption and decryption functions
 */

import * as crypto from 'crypto';
import type { Nullable } from '../types';

/**
 * Encrypts a string using AES-256-CBC encryption with a password
 * @param value - String to encrypt
 * @param password - Password for encryption
 * @returns Encrypted string (hex format), or empty string if error
 */
export function encryptString(value: string, password: string): string {
  if (!value || !password) {
    return '';
  }

  if (typeof value !== 'string' || typeof password !== 'string') {
    return '';
  }

  try {
    // Create a 32-byte key from the password
    const key = crypto.createHash('sha256').update(password).digest();

    // Generate a random initialization vector
    const iv = crypto.randomBytes(16);

    // Create cipher
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Encrypt the value
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Prepend IV to the encrypted data
    return iv.toString('hex') + ':' + encrypted;
  } catch {
    return '';
  }
}

/**
 * Decrypts a string that was encrypted using encryptString function
 * @param encrypted - Encrypted string to decrypt
 * @param password - Password for decryption
 * @returns Decrypted string, or null if decryption fails
 */
export function decryptString(encrypted: string, password: string): Nullable<string> {
  if (!encrypted || !password) {
    return null;
  }

  if (typeof encrypted !== 'string' || typeof password !== 'string') {
    return null;
  }

  try {
    // Split the IV and encrypted data
    const parts = encrypted.split(':');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      return null;
    }

    const iv = Buffer.from(parts[0], 'hex');
    const encryptedData = parts[1];

    // Create a 32-byte key from the password
    const key = crypto.createHash('sha256').update(password).digest();

    // Create decipher
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    // Decrypt the data
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch {
    return null;
  }
}
