import fs from 'fs';
import path from 'path';
import makePath from './make-path';
import isFile from './is-file';

/**
 * Writes content to a file, creating the necessary directory structure if it doesn't exist.
 *
 * @param {string} filePath - The full path of the file to write to.
 * @param {string} [contents=''] - The content to write to the file. Defaults to an empty string.
 * @returns {boolean} True if the file was written successfully, false otherwise.
 */
const writeFile = (filePath: string, contents: string = ''): boolean => {

  if (!makePath(path.dirname(filePath))) {
    return false;
  }

  try {
    fs.writeFileSync(filePath, String(contents));
  } catch (ex) {
    return false;
  }

  return isFile(filePath);
};

export default writeFile;
