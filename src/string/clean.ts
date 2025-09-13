/**
 * String cleaning functions
 */

import { ALPHANUMERIC, DIGITS } from '../constants';
import type { Optional, Nullable } from '../types/common';
import { isValidString, isBracketted } from '../validation/value-checks';
import { getBracket } from './extract';

/**
 * Cleans a string by keeping only specified valid characters and removing specified invalid characters
 */
export function cleanString(
  value: unknown,
  validChars?: string,
  invalidChars?: string,
): Optional<string> {
  if (!isValidString(value, false)) return undefined;

  let result = value;

  // Remove invalid characters first
  if (invalidChars && invalidChars.length > 0) {
    result = result
      .split('')
      .filter((char) => !invalidChars.includes(char))
      .join('');
  }

  // Keep only valid characters
  if (validChars && validChars.length > 0) {
    result = result
      .split('')
      .filter((char) => validChars.includes(char))
      .join('');
  }

  return result;
}

/**
 * Removes all characters from a string except for letters and numbers
 */
export function cleanAlphanumeric(value: unknown): Optional<string> {
  return cleanString(value, ALPHANUMERIC);
}

/**
 * Convenience alias for cleanAlphanumeric
 */
export const cleanAlphaNumeric = cleanAlphanumeric;

/**
 * Removes all non-digit characters from a string
 */
export function cleanDigits(value: unknown): Optional<string> {
  return cleanString(value, DIGITS);
}

/**
 * Trims leading and trailing whitespace from a string
 */
export function trimString(value: unknown): Optional<string> {
  if (typeof value !== 'string') return undefined;
  return value.trim();
}

/**
 * Trims leading and trailing whitespace from a string, returning null if empty
 */
export function trimToNull(value: unknown): Nullable<string> {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

/**
 * Trims leading and trailing whitespace from a string, returning undefined if empty
 */
export function trimToUndefined(value: unknown): Optional<string> {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
}

/**
 * Recursively removes matching pairs of brackets ( (), [], {} ) from the start and end of a string.
 * Stops when the string is no longer enclosed in a matching bracket pair or becomes empty.
 * @param value - The string potentially enclosed in brackets
 * @returns The string with all outer matching bracket pairs removed
 */
export function trimBrackets(value: unknown): Optional<string> {
  if (typeof value !== 'string') return undefined;

  let result = value;
  while (isBracketted(result)) {
    const bracket = getBracket(result);
    if (!bracket) break;

    if (result.length <= bracket.open.length + bracket.close.length) {
      return '';
    }

    result = result.substring(bracket.open.length);
    result = result.substring(0, result.length - bracket.close.length);
  }

  return result;
}
