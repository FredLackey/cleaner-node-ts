const crypto = require('crypto');
const fs = require('fs');
const c = require('../constants');

const isFile = require('./is-file');
const isValidString = require('./is-valid-string');

const ALGORITHMS = [
  'md5', 'sha1', 'sha256'
];
const DIGESTS = [
  'hex', 'base64'
];
const DEFAULT_DIGEST = 'hex';
const DEFAULT_ALGORITHM = 'md5';

/**
 * Computes a hash of a file's contents synchronously.
 * @param {string} value The path to the file.
 * @param {string} [algorithm='md5'] The hashing algorithm to use (e.g., 'md5', 'sha1', 'sha256').
 * @param {string} [digest='hex'] The encoding for the output hash (e.g., 'hex', 'base64').
 * @returns {string|null|undefined} The hash string, null if the input is not a file, or undefined if an error occurs during file reading or hashing.
 */
const hashFile = (value, algorithm = DEFAULT_ALGORITHM, digest = DEFAULT_DIGEST) => {

  if (!isFile(value)) { 
    return null; 
  }
  if (!isValidString(algorithm) || !ALGORITHMS.includes(algorithm.trim().toLowerCase())) {
    console.error(`Invalid algorithm: ${algorithm}`);
    return undefined;
  }
  if (!isValidString(digest) || !DIGESTS.includes(digest.trim().toLowerCase())) {
    console.error(`Invalid digest: ${digest}`);
    return undefined;
  }

  let fileBuffer;
  try {
    fileBuffer = fs.readFileSync(value);
  } catch (ex) {
    console.error(`Failure reading file: ${value}`);
    return undefined;
  }

  let hashSum;
  try {
    hashSum = crypto.createHash(algorithm.trim().toLowerCase());
  } catch (ex) {
    console.error(`Failure creating hash: ${algorithm}`);
    return undefined;
  }

  try {
    hashSum.update(fileBuffer);
  } catch (ex) {
    console.error(`Failure updating hash: ${value}`);
    return undefined;
  }

  let result;
  try {
    result = hashSum.digest(digest.trim().toLowerCase());
  } catch (ex) {
    console.error(`Failure digesting hash: ${digest}`);
    return undefined;
  }

  return result;
};

module.exports = hashFile;
