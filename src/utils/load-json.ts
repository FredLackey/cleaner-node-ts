import readFile from './read-file';
import isObject from './is-object';
import isValidArray from './is-valid-array';
import parseJson from './parse-json';

/**
 * Reads a file, parses its content as JSON, and returns the resulting object or array.
 * Returns null if the file cannot be read, parsing fails, or the result is not a valid object or array (empty arrays are okay).
 *
 * @param {string} filePath - The path to the JSON file.
 * @returns {object|Array|null} The parsed JSON object or array, or null on failure.
 */
const loadJson = (filePath: string): object | Array<any> | null => {

  const data = readFile(filePath);
  const obj  = parseJson(data);
  return (isObject(obj) || isValidArray(obj, true)) ? obj : null;

};

export default loadJson;
