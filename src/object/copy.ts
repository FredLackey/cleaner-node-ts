/**
 * Object copying and cloning functions
 */

import type { Nullable } from '../types/common';

/**
 * Creates a deep copy of an object using JSON stringification and parsing
 * Note: This method has limitations - won't preserve functions, undefined values,
 * symbols, dates (converts to strings), etc.
 */
export function copyObject<T>(obj: T): Nullable<T> {
  if (obj === null || obj === undefined) return null;

  try {
    // Handle primitives
    if (typeof obj !== 'object') {
      return obj;
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      return JSON.parse(JSON.stringify(obj));
    }

    // Handle dates
    if (obj instanceof Date) {
      return new Date(obj.getTime()) as unknown as T;
    }

    // Handle regular objects
    return JSON.parse(JSON.stringify(obj));
  } catch {
    return null;
  }
}

/**
 * Alias for copyObject
 */
export const copy = copyObject;
