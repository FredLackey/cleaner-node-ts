import fs from 'fs';
import isFolder from './is-folder';

/**
 * Creates a directory path, including any necessary parent directories.
 * If the directory already exists, it returns true.
 * Uses `fs.mkdirSync` with the `recursive` option.
 *
 * @param {string} dirPath - The directory path to create.
 * @returns {boolean} True if the directory exists or was successfully created, false otherwise.
 */
const makePath = (dirPath: string): boolean => {
  if (isFolder(dirPath)) { return true; }
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    return isFolder(dirPath);
  } catch (e) {
    return false;
  }
};

export default makePath;
