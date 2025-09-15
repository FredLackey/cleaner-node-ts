const multiLine  = require('./multi-line');
const singleLine = require('./single-line');
const toResult   = require('../to-result');

/**
 * Checks if a line or array of lines contains single-line or multi-line comments.
 * @param {string|string[]} lineOrLines The input line or lines.
 * @returns {boolean} True if comments are found, false otherwise.
 */
const hasComments = (lineOrLines) => {
  return singleLine.hasComments(lineOrLines) || multiLine.hasComments(lineOrLines);
};
/**
 * Removes single-line and multi-line comments from a line or an array of lines.
 * @param {string|string[]} lineOrLines The input line or lines.
 * @returns {string|string[]} The line or lines with comments removed, maintaining the original input type (string or array).
 */
const removeComments = (lineOrLines) => {

  const results = [].concat(lineOrLines).map(line => {

    let newLines = singleLine.removeComments(line);
        newLines = multiLine.removeComments(newLines);

    return newLines;

  });

  return toResult(results, lineOrLines);

};

module.exports = {
  multiLine,
  singleLine,

  hasComments,
  removeComments,
};
