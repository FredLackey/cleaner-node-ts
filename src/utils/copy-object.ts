const stringify = require('./stringify');

/**
 * Creates a deep copy of an object using JSON stringification and parsing.
 * Note: This method does not handle non-JSON-serializable values like functions, Dates, or undefined.
 * @param {object} item The object to copy.
 * @returns {object} A deep copy of the input object.
 */
const copyObject = item => {
  return JSON.parse(stringify(item));
};

module.exports = copyObject;
