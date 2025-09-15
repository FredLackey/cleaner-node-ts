const fs = require('fs');

/**
 * Gets the size of a file in bytes.
 * @param {string} filePath The path to the file.
 * @returns {number} The file size in bytes, or -1 if the path does not point to a file or an error occurs.
 */
const getFileSize = filePath => {
  try {
    const info = fs.lstatSync(filePath);
    return info.isFile() ? info.size : -1;
  } catch (e) {
    return -1;
  }
};

module.exports = getFileSize;
