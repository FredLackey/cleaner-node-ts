import crypto from 'crypto';

import isFile from './is-file';
import isValidString from './is-valid-string';
import getFileContents from './get-file-contents';
import readLines from './read-lines';

const ALGORITHMS = [
  'md5', 'sha1', 'sha256'
];
const DIGESTS = [
  'hex', 'base64'
];
const DEFAULT_DIGEST = 'hex';
const DEFAULT_ALGORITHM = 'md5';

/**
 * Computes a hash of the file contents.
 * @param {string} value The path to the file.
 * @param {boolean} [trim=false] If true, reads the file line by line, trims whitespace from each line, and joins them with newline characters before hashing. Otherwise, reads the entire file buffer.
 * @param {string} [algorithm='md5'] The hashing algorithm to use (e.g., 'md5', 'sha1', 'sha256').
 * @param {string} [digest='hex'] The encoding for the output hash (e.g., 'hex', 'base64').
 * @returns {Promise<string|null|undefined>} A promise that resolves with the hash string, null if the input is not a file, or undefined if an error occurs during file reading or hashing.
 */
const hashFileContents = async (value: string, trim: boolean = false, algorithm: string = DEFAULT_ALGORITHM, digest: string = DEFAULT_DIGEST): Promise<string | null | undefined> => {

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

  let fileBuffer: string | Buffer;
  try {
    if (!trim) {
      const contents = getFileContents(value);
      if (contents === undefined) {
        return undefined;
      }
      fileBuffer = contents;
    } else {
      const lines = await readLines(value);
      if (lines && Array.isArray(lines)) {
        fileBuffer = lines.filter(x => (isValidString(x))).map(x => x.trim()).join('\n');
      } else {
        fileBuffer = '';
      }
    }
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
    if (fileBuffer !== undefined) {
      hashSum.update(fileBuffer);
    } else {
      return undefined;
    }
  } catch (ex) {
    console.error(`Failure updating hash: ${value}`);
    return undefined;
  }

  let result;
  try {
    result = hashSum.digest(digest.trim().toLowerCase() as crypto.BinaryToTextEncoding);
  } catch (ex) {
    console.error(`Failure digesting hash: ${digest}`);
    return undefined;
  }

  return result;
};

export default hashFileContents;
