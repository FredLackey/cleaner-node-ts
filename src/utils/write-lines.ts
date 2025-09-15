const os            = require('os');
const writeFile     = require('./write-file');
const isValidArray  = require('./is-valid-array');
const isValidString = require('./is-valid-string');

/**
 * Writes an array of strings to a file, joining them with the OS-specific end-of-line character.
 * Filters out non-string elements from the input array.
 *
 * @param {string} filePath - The full path of the file to write to.
 * @param {Array<string|any>} lines - An array of lines to write. Non-string elements will be ignored.
 * @returns {Promise<boolean>} A promise that resolves to true if the file was written successfully, false otherwise.
 */
const writeLines = async (filePath, lines) => {

  if (!isValidString(lines) && !isValidArray(lines)) {
    return false;
  }

  const data = lines.filter(x => (typeof x === 'string')).join(os.EOL);
  return writeFile(filePath, data);
};

module.exports = writeLines;
