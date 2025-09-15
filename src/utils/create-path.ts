import fs from 'fs';
import isFolder from './is-folder';
import isValidString from './is-valid-string';

/**
 * Creates a directory path recursively if it doesn't already exist.
 * @param {string} value The directory path to create.
 * @returns {boolean} True if the path exists or was successfully created, false otherwise.
 */
const createPath = value => {
  if (!isValidString(value)) { return false; }
  if (isFolder(value)) { return true; }
  try {
    fs.mkdirSync(value, {
      recursive: true
    });
  } catch (ex) {
    console.error(ex);
  }
  return isFolder(value);
};

export default createPath;
