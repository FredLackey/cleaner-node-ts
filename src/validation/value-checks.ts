/**
 * Value validation functions
 */

import { ALPHA, ALPHANUMERIC, DIGITS, BRACKET_PAIRS } from '../constants';
import { isObject, isSet } from './type-checks';

/**
 * Checks if a value is a string and optionally if it's non-empty after trimming
 */
export function isValidString(value: unknown, checkTrimmed = true): value is string {
  if (typeof value !== 'string') return false;
  if (!checkTrimmed) return true;
  return value.trim().length > 0;
}

/**
 * Checks if a value is not set or is a valid string
 */
export function isValidStringIfSet(value: unknown, checkTrimmed = true): boolean {
  return value === null || value === undefined || isValidString(value, checkTrimmed);
}

/**
 * Checks if a value is an array and optionally if it's non-empty
 */
export function isValidArray(value: unknown, checkNonEmpty = false): value is unknown[] {
  if (!Array.isArray(value)) return false;
  if (!checkNonEmpty) return true;
  return value.length > 0;
}

/**
 * Checks if a value is not set or is a valid array
 */
export function isValidArrayIfSet(value: unknown, checkNonEmpty = false): boolean {
  return value === null || value === undefined || isValidArray(value, checkNonEmpty);
}

/**
 * Checks if a value is a non-empty plain JavaScript object
 */
export function isValidObject(value: unknown): value is Record<string, unknown> {
  if (!isObject(value)) return false;
  return Object.keys(value).length > 0;
}

/**
 * Checks if a value is an array that contains no elements
 */
export function isEmptyArray(value: unknown): boolean {
  return Array.isArray(value) && value.length === 0;
}

/**
 * Checks if a string contains only alphabetic characters
 */
export function isAlpha(value: unknown): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  for (const char of value) {
    if (!ALPHA.includes(char)) return false;
  }
  return true;
}

/**
 * Checks if a string contains only alphanumeric characters
 */
export function isAlphanumeric(value: unknown): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  for (const char of value) {
    if (!ALPHANUMERIC.includes(char)) return false;
  }
  return true;
}

/**
 * Convenience alias for isAlphanumeric
 */
export const isAlphaNumeric = isAlphanumeric;

/**
 * Checks if a string contains only numeric digits
 */
export function isDigits(value: unknown): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  for (const char of value) {
    if (!DIGITS.includes(char)) return false;
  }
  return true;
}

/**
 * Checks if a string is entirely uppercase
 */
export function isUpperCase(value: unknown): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  return value === value.toUpperCase();
}

/**
 * Alias for isUpperCase
 */
export const isCaps = isUpperCase;

/**
 * Checks if a string is entirely lowercase
 */
export function isLowerCase(value: unknown): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  return value === value.toLowerCase();
}

/**
 * Checks if a string starts and ends with corresponding brackets
 */
export function isBracketted(value: unknown): boolean {
  if (typeof value !== 'string' || value.length < 2) return false;

  const firstChar = value[0];
  const lastChar = value[value.length - 1];

  if (firstChar && lastChar && firstChar in BRACKET_PAIRS) {
    return BRACKET_PAIRS[firstChar] === lastChar;
  }

  return false;
}

/**
 * Checks if a string is valid JSON (either an object or array)
 */
export function isJson(value: unknown): boolean {
  if (typeof value !== 'string' || value.trim().length === 0) return false;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' && parsed !== null;
  } catch {
    return false;
  }
}

/**
 * Checks if a string is a valid JSON object
 */
export function isJsonObject(value: unknown): boolean {
  if (typeof value !== 'string' || value.trim().length === 0) return false;
  const trimmed = value.trim();
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) return false;
  try {
    const parsed = JSON.parse(trimmed);
    return isObject(parsed);
  } catch {
    return false;
  }
}

/**
 * Checks if a string is a valid JSON array
 */
export function isJsonArray(value: unknown): boolean {
  if (typeof value !== 'string' || value.trim().length === 0) return false;
  const trimmed = value.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) return false;
  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed);
  } catch {
    return false;
  }
}

/**
 * Checks if a string contains only characters from a specified set
 */
export function isValidChars(value: unknown, validChars: string): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  if (typeof validChars !== 'string' || validChars.length === 0) return false;

  for (const char of value) {
    if (!validChars.includes(char)) return false;
  }
  return true;
}

/**
 * Compares two strings for equality with options for case sensitivity and whitespace
 */
export function isMatch(
  str1: unknown,
  str2: unknown,
  caseSensitive = true,
  trimmed = true,
): boolean {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') return false;

  let val1 = str1;
  let val2 = str2;

  if (trimmed) {
    val1 = val1.trim();
    val2 = val2.trim();
  }

  if (!caseSensitive) {
    val1 = val1.toLowerCase();
    val2 = val2.toLowerCase();
  }

  return val1 === val2;
}

/**
 * Checks if two values are valid Dates representing the exact same time
 */
export function isEqualDate(date1: unknown, date2: unknown): boolean {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) return false;
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return false;
  return date1.getTime() === date2.getTime();
}

/**
 * Convenience alias for isEqualDate
 */
export const isSameDate = isEqualDate;

/**
 * Checks if a value represents the "zero date" (epoch)
 */
export function isZeroDate(value: unknown): boolean {
  if (!(value instanceof Date)) return false;
  return value.getTime() === 0;
}

/**
 * Checks if a string appears to be a valid file/folder path based on its basename
 */
export function isValidPath(value: unknown): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;

  // Basic path validation - no null bytes, must have valid characters
  if (value.includes('\0')) return false;

  // Check for invalid characters in paths
  // eslint-disable-next-line no-control-regex
  const invalidChars = /[\x00-\x1f]/;
  if (invalidChars.test(value)) return false;

  // Must not be just dots
  if (/^\.+$/.test(value)) return false;

  return true;
}

/**
 * Checks if a value is not set or is a valid path
 */
export function isValidPathIfSet(value: unknown): boolean {
  return value === null || value === undefined || isValidPath(value);
}

/**
 * Checks if an item is considered "deleted" based on a provided checking function
 */
export function isDeleted(item: unknown, checkFn?: (item: unknown) => boolean): boolean {
  if (!isSet(item)) return true;

  if (checkFn && typeof checkFn === 'function') {
    return checkFn(item);
  }

  // Default checks for common deletion indicators
  if (isObject(item)) {
    const obj = item;
    return (
      obj.deleted === true ||
      obj.isDeleted === true ||
      obj.deletedAt !== undefined ||
      obj.deleted_at !== undefined
    );
  }

  return false;
}
