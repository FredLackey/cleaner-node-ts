const c = require('../constants');
const isValidString = require('./is-valid-string');

/**
 * Finds the matching bracket pair (e.g., { open: '(', close: ')' }) from a predefined list 
 * (`constants.BRACKETS`) that encloses the given string value.
 * @param {string} value The string to check for enclosing brackets.
 * @returns {object|undefined} The matching bracket pair object if found, otherwise undefined.
 */
const getBracket = value => {
  if (!isValidString(value)) { return false; }
  return c.BRACKETS.find(b => {
    return value.startsWith(b.open) && value.endsWith(b.close);
  });
};

module.exports = getBracket;
