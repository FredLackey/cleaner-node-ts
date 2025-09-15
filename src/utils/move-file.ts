const fs = require('fs');
const path = require('path');
const isFile = require('./is-file');
const deleteFile = require('./delete-file');
const makePath = require('./make-path');

/**
 * Internal helper function to attempt renaming a file.
 * Catches errors during the rename operation.
 *
 * @param {string} sourcePath - The current path of the file.
 * @param {string} destinationPath - The desired new path for the file.
 * @returns {boolean} True if the rename was successful and the destination file exists, false otherwise.
 */
const rename = (sourcePath, destinationPath) => {
  try {
    fs.renameSync(sourcePath, destinationPath);
  } catch (ex) {
    return false;
  }
  return isFile(destinationPath);
};

/**
 * Moves a file from a source path to a destination path.
 * First, attempts to rename the file (atomic move on the same filesystem).
 * If renaming fails (e.g., moving across different filesystems), it falls back to copying the file
 * and then deleting the original source file.
 * Ensures the destination directory exists before attempting the move.
 *
 * @param {string} sourcePath - The path of the file to move.
 * @param {string} destinationPath - The target path to move the file to.
 * @returns {boolean} True if the file was successfully moved (either by rename or copy+delete), false otherwise.
 */
const moveFile = (sourcePath, destinationPath) => {
  
  if (!makePath(path.dirname(destinationPath))) { return false; }

  if (rename(sourcePath, destinationPath)) {
    return true;
  }
  
  try {
    fs.copyFileSync(sourcePath, destinationPath);
  } catch (ex) {
    return false;
  }
  
  if (!isFile(destinationPath)) { return false; }
  return deleteFile(sourcePath);
};

module.exports = moveFile;
