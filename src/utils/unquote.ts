const isValidString = require('./is-valid-string');
const getPads       = require('./get-pads');
const { QUOTE }     = require('../constants');

/**
 * Removes leading and trailing quote characters (") from a string, preserving any leading/trailing whitespace.
 * If the string is not valid, is less than 3 characters long after trimming, or doesn't start and end with a quote, the original value is returned.
 *
 * @param {string} value - The string to unquote.
 * @returns {string} The unquoted string or the original value if unquoting is not applicable.
 */
const unQuote = value => {

  if (!isValidString(value)) {
    return value;
  }
  if (value.trim().length < 3) {
    return value;
  }
  
  const pads = getPads(value);

  const prefix = pads.prefix > 0 ? value.substring(0, pads.prefix) : '';
  const suffix = pads.suffix > 0 ? value.substring(value.length - pads.suffix) : '';

  const trimmed = value.trim();

  const first = trimmed.substring(0, 1);
  const last = trimmed.substring(trimmed.length - 1);

  if (first !== QUOTE || last !== QUOTE) {
    return value;
  }

  let result = trimmed.substring(1);
      result = result.substring(0, result.length - 1);

  return prefix + result + suffix;
};

module.exports = unQuote;
