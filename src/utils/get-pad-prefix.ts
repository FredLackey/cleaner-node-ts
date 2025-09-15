import { SPACE  } from '../constants';
import getPads from './get-pads';
import isValidString from './is-valid-string';

/**
 * Gets the leading whitespace (prefix padding) of a string.
 * Returns null if the input is not a valid string (empty string is okay).
 * Returns an empty string if there is no leading whitespace.
 * Otherwise, returns a string consisting of spaces matching the length of the leading whitespace.
 *
 * @param {string} value - The string to analyze.
 * @returns {string|null} The leading whitespace as a string of spaces, or an empty string, or null.
 */
const getPadPrefix = value => {
  if (!isValidString(value, true)) { return null; }
  const pads = getPads(value);
  if (pads.prefix === 0) { return ''; }
  return ''.padStart(pads.prefix, SPACE);
};

export default getPadPrefix;
