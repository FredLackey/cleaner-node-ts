import isValidString from './is-valid-string';
import parseJson from './parse-json';
import isObject from './is-object';

/**
 * Checks if a string is a valid JSON object
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is a valid JSON object, false otherwise
 * @description
 * The function:
 * 1. Validates the input is a non-empty string
 * 2. Removes whitespace, tabs, and newlines
 * 3. Attempts to parse the string as JSON
 * 4. Verifies the parsed result is a valid object
 */
const isJsonObject = (str: any): boolean => {

  if (!isValidString(str)) {
    return false;
  }

  let cleaned = str;
  cleaned = cleaned.replace(/\t/g, ""); // Tabs
  cleaned = cleaned.replace(/\r/g, ""); // Cariage return
  cleaned = cleaned.replace(/\n/g, ""); // Line feeds
  cleaned = cleaned.trim();

  if (!isValidString(cleaned)) {
    return false;
  }

  const parsed = parseJson(cleaned, false);
  return isObject(parsed);

}

export default isJsonObject;