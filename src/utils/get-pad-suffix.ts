import { SPACE  } from '../constants';
import getPads from './get-pads';
import isValidString from './is-valid-string';

/**
 * Gets the trailing whitespace (suffix padding) of a string.
 * Returns null if the input is not a valid string (empty string is okay).
 * Returns an empty string if there is no trailing whitespace.
 * Otherwise, returns a string consisting of spaces matching the length of the trailing whitespace.
 *
 * @param {string} value - The string to analyze.
 * @returns {string|null} The trailing whitespace as a string of spaces, or an empty string, or null.
 */
const getPadSuffix = (value: any): string | null => {
  if (!isValidString(value, true)) { return null; }
  const pads = getPads(value);
  if (pads.suffix === 0) { return ''; }
  return ''.padStart(pads.suffix, SPACE);
};

export default getPadSuffix;
