const isValidString = require('./is-valid-string');
const getBracket        = require('./get-bracket');

/**
 * Checks if a string starts with an opening bracket ('(', '[', '{') and ends with the corresponding closing bracket.
 * Uses `getBracket` to determine the bracket pair.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is valid and enclosed in matching brackets, false otherwise.
 */
const isBracketted = value => {
  const bracket = getBracket(value);
  return (bracket && isValidString(value));
};

module.exports = isBracketted;
