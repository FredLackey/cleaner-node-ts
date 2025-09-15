const fs = require('fs');

/**
 * Synchronously reads the contents of a file.
 * @param {string} filePath The path to the file.
 * @param {object|string} [options] Options passed to `fs.readFileSync` (e.g., encoding, flag) or the encoding string itself.
 * @param {string} [format='utf8'] The encoding format to use when converting the buffer to a string.
 * @returns {string|undefined} The file contents as a string, or undefined if an error occurs during reading.
 */
const getFileContents = (filePath, options, format = 'utf8') => {
  try {
    let contents = fs.readFileSync(filePath, options);
        contents = contents.toString(format);
    return contents;
  } catch (ex) {
    return undefined;
  }
};

module.exports = getFileContents;
