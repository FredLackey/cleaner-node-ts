const isValidString = require('../is-valid-string');
const isValidArray  = require('../is-valid-array');
const isString = value => isValidString(value, true);

const QUOTES = [
  '"',
  "'",
];
const DELIMITERS = [
  '#',
  '//',
];
const TYPES = {
  QUOTE: 'quote',
  DELIMITER: 'delimiter',
};

/**
 * Finds the starting position of the first single-line comment delimiter ('#' or '//') 
 * in a string, ignoring delimiters within quoted strings.
 * @param {string} line The line of text to search.
 * @returns {number} The 0-based index of the start of the comment, or -1 if no comment delimiter is found.
 */
const getDelimPosition = line => {
  
  if (!isString(line)) {
    return -1;
  }

  let inQuote  = false;
  let curQuote = null;

  for (let i = 0; i < line.length; i += 1) {

    const char    = line[i];
    const isQuote = QUOTES.includes(char);

    if (isQuote && !inQuote) {
      inQuote = true;
      curQuote = char;
      continue;
    }

    if (isQuote && inQuote && curQuote === char) {
      inQuote = false;
      curQuote = null;
      continue;
    }

    if (isQuote) {
      inQuote = !inQuote;
      continue;
    }
    if (inQuote) {
      continue;
    }
    
    const delim = DELIMITERS.find(delim => line.startsWith(delim, i));
    if (delim) {
      return i;
    }

  }

  return -1;

};
/**
 * Checks if a line contains a single-line comment delimiter, ignoring delimiters within quotes.
 * @param {string} line The line to check.
 * @returns {boolean} True if a delimiter is found, false otherwise.
 */
const hasDelimeter = line => getDelimPosition(line) >= 0;
/**
 * Removes the single-line comment (and subsequent text) from a string, ignoring delimiters within quotes.
 * @param {string} line The line to process.
 * @returns {string} The line with the comment removed.
 */
const removeComment = line => {
  const pos = getDelimPosition(line);
  if (pos < 0) { return line; }
  const trimmed = line.substring(0, pos);
  return trimmed;
};
/**
 * Removes single-line comments from a single string or an array of strings.
 * @param {string|string[]} lineOrLines The input string or array of strings.
 * @returns {string|string[]|undefined} The processed string or array with comments removed, or undefined if the input type is invalid.
 */
const removeComments = lineOrLines => {
  const result = isString(lineOrLines)
    ? removeComment(lineOrLines)
    : isValidArray(lineOrLines, true)
      ? lineOrLines.map(x => removeComment(x))
      : undefined;
  return result;
};

module.exports = {
  getDelimPosition,
  hasDelimeter,
  removeComment,
  removeComments,
};
