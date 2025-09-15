const rimraf   = require('rimraf');
const isFolder = require('./is-folder');

/**
 * Synchronously deletes a directory and its contents recursively.
 * Uses the rimraf package.
 * @param {string} folderPath The path to the directory to delete.
 * @returns {boolean} True if the directory doesn't exist after the operation (or didn't exist initially), false otherwise.
 */
const deleteDirectory = (folderPath) => {
  if (!isFolder(folderPath)) {
    return true;
  }
  try {
    rimraf.sync(folderPath);
    return (!isFolder(folderPath));
  } catch (ex) {
    console.debug(ex);
    return (!isFolder(folderPath));
  }
};

module.exports = deleteDirectory;
