const isObject = require('./is-object');
const isValidArray = require('./is-valid-array');
const writeFile = require('./write-file');
const stringify = require('./stringify');

/**
 * Converts an object or array to a JSON string and saves it to a file.
 * Ensures the necessary directory structure exists before writing.
 *
 * @param {object|Array} data - The object or array to save as JSON.
 * @param {string} filePath - The full path of the file to save the JSON data to.
 * @returns {boolean} True if the data was a valid object/array and the file was written successfully, false otherwise.
 */
const saveJson = (data, filePath) => {
  return (isObject(data) || isValidArray(data, true)) 
    && writeFile(filePath, stringify(data));
};

module.exports = saveJson;
