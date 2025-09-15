const isValidString = require('./is-valid-string');
const crypto        = require('crypto');

const DEFAULT_OPTIONS = {
  algorithm : 'aes-256-cbc',
  ivLength  : 16,              // AES block size,
  saltLength: 16,              // For key derivation
  keyLength : 32,              // 256 bits
};

/**
 * Decrypts a string that was encrypted using encryptString
 *
 * @param {string} encryptedHex - The hex-encoded encrypted string
 * @param {string} password - The password used for decryption (same as used for encryption)
 * @param {Object} [options=DEFAULT_OPTIONS] - Decryption options
 * @param {string} [options.algorithm='aes-256-cbc'] - Decryption algorithm
 * @param {number} [options.ivLength=16] - Initialization vector length (AES block size)
 * @param {number} [options.saltLength=16] - Salt length for key derivation
 * @param {number} [options.keyLength=32] - Key length (256 bits)
 * @returns {string} - The decrypted string
 * @throws {Error} If encryptedHex or password is invalid
 */
function decryptString(encryptedHex, password, options = DEFAULT_OPTIONS) {

  if (!isValidString(encryptedHex) || !isValidString(password)) {
    throw new Error('Invalid input');
  }

  options = { ...DEFAULT_OPTIONS, ...options };

  const { algorithm, ivLength, saltLength, keyLength } = options;

  const data          = Buffer.from(encryptedHex, 'hex');
  const salt          = data.slice(0, saltLength);
  const iv            = data.slice(saltLength, saltLength + ivLength);
  const encryptedText = data.slice(saltLength + ivLength);

  const key      = crypto.scryptSync(password, salt, keyLength);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted  = decipher.update(encryptedText, null, 'utf8');
      decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = decryptString;
