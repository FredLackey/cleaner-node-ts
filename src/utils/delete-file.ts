const fs = require('fs');
const isFile = require('./is-file');

/**
 * Synchronously deletes a file.
 * @param {string} filePath The path to the file to delete.
 * @param {boolean} [missingOkay=true] If true, returns true even if the file doesn't exist. If false, returns false if the file doesn't exist.
 * @returns {boolean} True if the file is successfully deleted (or didn't exist and missingOkay is true), false otherwise.
 */
const deleteFile = (filePath, missingOkay = true) => {
  if (!isFile(filePath)) { return (missingOkay === true); }
  try {
    fs.unlinkSync(filePath);
    return (!isFile(filePath));
  } catch (ex) {
    return (!isFile(filePath));
  }
};

module.exports = deleteFile;
