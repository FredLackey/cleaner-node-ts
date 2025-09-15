import isJsonObject from './is-json-object';
import isJsonArray from './is-json-array';

/**
 * Checks if a string is valid JSON (either an object or array)
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is valid JSON, false otherwise
 */
const isJson = (str: any): boolean => {
  return isJsonObject(str) || isJsonArray(str);
}

export default isJson;
