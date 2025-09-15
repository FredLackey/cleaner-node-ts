/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const readline = require('readline');

/**
 * Asynchronously reads a file line by line and returns an array of strings.
 * Returns an array containing each line of the file, or undefined if an error occurs (e.g., file not found).
 *
 * @param {string} filePath - The path to the file to read.
 * @returns {Promise<string[]|undefined>} A promise that resolves to an array of strings (each representing a line), or undefined on failure.
 */
const readLines = async (filePath) => {
  const lines = [];
  try {
    const stream  = fs.createReadStream(filePath);
    const file    = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });
    for await (const line of file) {
      lines.push(line);
    }
    return lines;
  } catch (ex) {
    return undefined;
  }
};

module.exports = readLines;
