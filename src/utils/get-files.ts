const fs                = require('fs');
const path              = require('path');
const isFolder          = require('./is-folder');
const isValidString = require('./is-valid-string');

/**
 * Synchronously reads the contents of a directory and returns an array of full paths for its direct children (files and subdirectories).
 * @param {string} folderPath The path to the directory.
 * @returns {string[]|null} An array of full paths of items within the directory, or null if the path is not a valid folder or an error occurs.
 */
const getFiles = folderPath => {
  if (!isFolder(folderPath)) { return null; }
  try {
    const names = fs.readdirSync(folderPath);
    return [].concat(names)
      .filter(isValidString)
      .map(name => (path.join(folderPath, name)));
  } catch (ex) {
    return null;
  }
};

module.exports = getFiles;
