import os from 'os';
import writeFile from './write-file';
import isValidArray from './is-valid-array';
import isValidString from './is-valid-string';

/**
 * Writes an array of strings to a file, joining them with the OS-specific end-of-line character.
 * Filters out non-string elements from the input array.
 *
 * @param {string} filePath - The full path of the file to write to.
 * @param {Array<string|any>} lines - An array of lines to write. Non-string elements will be ignored.
 * @returns {boolean} True if the file was written successfully, false otherwise.
 */
const writeLines = (filePath: any, lines: any): boolean => {

  if (!isValidString(lines) && !isValidArray(lines)) {
    return false;
  }

  const data = lines.filter(x => (typeof x === 'string')).join(os.EOL);
  return writeFile(filePath, data);
};

export default writeLines;
