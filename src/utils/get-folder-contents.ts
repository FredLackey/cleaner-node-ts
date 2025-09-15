const fs = require('fs');
const path = require('path');
const isValidString = require('./is-valid-string');

/**
 * Synchronously reads the contents of a directory and returns an array of full paths for its direct children.
 * Similar to `getFiles`, but returns `undefined` instead of `null` on error or invalid input.
 * @param {string} folderPath The path to the directory.
 * @returns {string[]|undefined} An array of full paths of items within the directory, or undefined if the path is invalid or an error occurs.
 */
const getFolderContents = folderPath => {
  if (!isValidString(folderPath)) { return undefined; }
  try {
    const names = fs.readdirSync(folderPath);
    return [].concat(names).filter(x => (isValidString(x))).map(name => (path.join(folderPath, name)));
  } catch (ex) {
    return undefined;
  }
};

module.exports = getFolderContents;
