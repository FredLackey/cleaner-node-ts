/**
 * Array unique/deduplication functions
 */

import type { Nullable, UniqueOptions } from '../types/common';
import { isObject, isNumber } from '../validation';
import { isValidString } from '../validation/value-checks';

/**
 * Creates a new array with unique values based on the predominant data type
 */
export function unique<T>(array: unknown, options?: UniqueOptions): Nullable<T[]> {
  if (!Array.isArray(array)) return null;
  if (array.length === 0) return [];

  // Detect predominant type
  const typeCount = {
    number: 0,
    string: 0,
    object: 0,
    other: 0,
  };

  array.forEach((item) => {
    if (typeof item === 'number' || isNumber(item)) {
      typeCount.number++;
    } else if (typeof item === 'string') {
      typeCount.string++;
    } else if (isObject(item)) {
      typeCount.object++;
    } else {
      typeCount.other++;
    }
  });

  // Use appropriate unique function based on predominant type
  const maxType = Object.entries(typeCount).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

  switch (maxType) {
    case 'number':
      return uniqueNumbers(array) as T[];
    case 'string':
      return uniqueStrings(array, options) as T[];
    case 'object':
      return uniqueObjects(array) as T[];
    default:
      // Fallback to Set-based deduplication
      return [...new Set(array)] as T[];
  }
}

/**
 * Filters an array to contain only unique numbers or string representations of numbers
 */
export function uniqueNumbers(array: unknown): Nullable<number[]> {
  if (!Array.isArray(array)) return null;

  const seen = new Set<number>();
  const result: number[] = [];

  for (const item of array) {
    if (isNumber(item)) {
      const num = typeof item === 'number' ? item : Number(item);
      if (!seen.has(num)) {
        seen.add(num);
        result.push(num);
      }
    }
  }

  return result;
}

/**
 * Filters an array to contain only unique strings
 */
export function uniqueStrings(array: unknown, options?: UniqueOptions): Nullable<string[]> {
  if (!Array.isArray(array)) return null;

  const caseSensitive = options?.caseSensitive !== false;
  const trim = options?.trim !== false;
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of array) {
    if (isValidString(item, false)) {
      let str = item;

      if (trim) {
        str = str.trim();
      }

      const key = caseSensitive ? str : str.toLowerCase();

      if (!seen.has(key)) {
        seen.add(key);
        result.push(str);
      }
    }
  }

  return result;
}

/**
 * Filters an array to contain only unique objects (by strict equality or stringification)
 */
export function uniqueObjects(array: unknown): Nullable<object[]> {
  if (!Array.isArray(array)) return null;

  const seen = new Set<string>();
  const result: object[] = [];

  for (const item of array) {
    if (isObject(item)) {
      const key = JSON.stringify(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
  }

  return result;
}
