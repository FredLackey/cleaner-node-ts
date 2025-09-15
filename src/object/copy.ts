/**
 * Object copying and cloning functions
 */

import type { Nullable } from '../types/common';
import { stringify } from '../string/transform';

/**
 * Creates a deep copy of an object using JSON stringification and parsing
 * Note: This method does not handle non-JSON-serializable values like functions, Dates, or undefined
 */
export function copyObject<T>(item: T): T {
  return JSON.parse(stringify(item));
}

/**
 * Alias for copyObject
 */
export const copy = copyObject;
