const isValidString = require('./is-valid-string');
const crypto        = require('crypto');

const DEFAULT_OPTIONS = {
  algorithm : 'aes-256-cbc',
  ivLength  : 16,              // AES block size,
  saltLength: 16,              // For key derivation
  keyLength : 32,              // 256 bits
};

/**
 * Encrypts a string using AES-256-CBC encryption
 *
 * @param {string} text - The text to encrypt
 * @param {string} password - The password used for encryption
 * @param {Object} [options=DEFAULT_OPTIONS] - Encryption options
 * @param {string} [options.algorithm='aes-256-cbc'] - Encryption algorithm
 * @param {number} [options.ivLength=16] - Initialization vector length (AES block size)
 * @param {number} [options.saltLength=16] - Salt length for key derivation
 * @param {number} [options.keyLength=32] - Key length (256 bits)
 * @returns {string} - Hex-encoded encrypted string (containing salt + iv + encrypted data)
 * @throws {Error} If text or password is invalid
 */
function encryptString(text, password, options = DEFAULT_OPTIONS) {
  
  if (!isValidString(text) || !isValidString(password)) {
    throw new Error('Invalid input');
  }

  options = { ...DEFAULT_OPTIONS, ...options };

  const { algorithm, ivLength, saltLength, keyLength } = options;

  const salt = crypto.randomBytes(saltLength);
  const iv   = crypto.randomBytes(ivLength);

  const key    = crypto.scryptSync(password, salt, keyLength);  // derive key
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted  = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');

    // Combine salt + iv + encrypted
  const result = Buffer.concat([salt, iv, Buffer.from(encrypted, 'hex')]).toString('hex');
  return result;
}

module.exports = encryptString;
