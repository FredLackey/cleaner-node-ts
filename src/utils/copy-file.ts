const fs = require('fs');

/**
 * Synchronously copies a file from a source path to a target path.
 * @param {string} sourcePath The path to the source file.
 * @param {string} targetPath The path to the destination file. It will be created or overwritten.
 * @returns {boolean} True if the copy was successful, false otherwise.
 */
const copyFile = (sourcePath, targetPath) => {
  try {
    fs.copyFileSync(sourcePath, targetPath);
  } catch (e) {
    return false;
  }
  return true;
};

module.exports = copyFile;
