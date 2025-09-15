const fs = require('fs');
const isFile = require('./is-file');

/**
 * Reads the entire content of a file synchronously.
 * Returns the file content as a UTF-8 string, or null if the file doesn't exist or an error occurs during reading.
 * Logs an error to the debug console if reading fails.
 *
 * @param {string} filePath - The path to the file to read.
 * @returns {string|null} The content of the file as a string, or null on failure.
 */
const readFile = (filePath) => {

  if (!isFile(filePath)) {
    return null;
  }


  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (err) {
    console.debug(`Error reading JSON file ${filePath}: ${err}`);
    return null;
  }
};

module.exports = readFile;
