const readFile = require('./read-file');
const isObject = require('./is-object');
const isValidArray = require('./is-valid-array');
const parseJson = require('./parse-json');

/**
 * Reads a file, parses its content as JSON, and returns the resulting object or array.
 * Returns null if the file cannot be read, parsing fails, or the result is not a valid object or array (empty arrays are okay).
 *
 * @param {string} filePath - The path to the JSON file.
 * @returns {object|Array|null} The parsed JSON object or array, or null on failure.
 */
const loadJson = (filePath) => {

  const data = readFile(filePath);
  const obj  = parseJson(data);
  return (isObject(obj) || isValidArray(obj, true)) ? obj : null;

};

module.exports = loadJson;
