const getBracket = require('./get-bracket');
const isBracketted = require('./is-bracketted');

/**
 * Recursively removes matching pairs of brackets ( (), [], {} ) from the start and end of a string.
 * Stops when the string is no longer enclosed in a matching bracket pair or becomes empty.
 *
 * @param {string} value - The string potentially enclosed in brackets.
 * @returns {string} The string with all outer matching bracket pairs removed.
 */
const trimBrackets = value => {
  while (isBracketted(value)) {
    const bracket = getBracket(value);
    if (value.length <= (bracket.open.length + bracket.close.length)) {
      return '';
    }
    value = value.substr(bracket.open.length);
    value = value.substr(0, value.length - bracket.close.length);
  }
  return value;
};

module.exports = trimBrackets;
