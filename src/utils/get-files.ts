import fs from 'fs';
import path from 'path';
import isFolder from './is-folder';
import isValidString from './is-valid-string';

/**
 * Synchronously reads the contents of a directory and returns an array of full paths for its direct children (files and subdirectories).
 * @param {string} folderPath The path to the directory.
 * @returns {string[]|null} An array of full paths of items within the directory, or null if the path is not a valid folder or an error occurs.
 */
const getFiles = (folderPath: any): string[] | null => {
  if (!isFolder(folderPath)) { return null; }
  try {
    const names = fs.readdirSync(folderPath);
    return [].concat(names)
      .filter((x: any) => isValidString(x))
      .map(name => (path.join(folderPath, name)));
  } catch (ex) {
    return null;
  }
};

export default getFiles;
