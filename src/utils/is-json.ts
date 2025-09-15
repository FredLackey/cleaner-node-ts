const isJsonObject = require("./is-json-object");
const isJsonArray = require("./is-json-array");

/**
 * Checks if a string is valid JSON (either an object or array)
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is valid JSON, false otherwise
 */
const isJson = str => {
  return isJsonObject(str) || isJsonArray(str);
}

module.exports = isJson;
