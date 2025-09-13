/**
 * Array access and retrieval functions
 */

import type { Optional } from '../types/common';
import { isValidString } from '../validation/value-checks';

/**
 * Gets the first element of an array or the first character of a string
 */
export function getFirst<T>(value: unknown): Optional<T> {
  if (Array.isArray(value)) {
    return value.length > 0 ? (value[0] as T) : undefined;
  }
  if (isValidString(value, false)) {
    return value.length > 0 ? (value[0] as unknown as T) : undefined;
  }
  return undefined;
}

/**
 * Gets the last element of an array or the last character of a string
 */
export function getLast<T>(value: unknown): Optional<T> {
  if (Array.isArray(value)) {
    return value.length > 0 ? (value[value.length - 1] as T) : undefined;
  }
  if (isValidString(value, false)) {
    return value.length > 0 ? (value[value.length - 1] as unknown as T) : undefined;
  }
  return undefined;
}

/**
 * Returns the first element of an array if it contains exactly one element
 */
export function getSingle<T>(array: unknown): Optional<T> {
  if (!Array.isArray(array)) return undefined;
  return array.length === 1 ? (array[0] as T) : undefined;
}

/**
 * Gets the length of an array, handling non-arrays gracefully
 */
export function getArrayCount(array: unknown): number {
  return Array.isArray(array) ? array.length : 0;
}

/**
 * Finds the maximum numeric value in an array
 */
export function getMax(array: unknown): Optional<number> {
  if (!Array.isArray(array) || array.length === 0) return undefined;

  let max: number | undefined = undefined;

  for (const item of array) {
    if (typeof item === 'number' && isFinite(item)) {
      if (max === undefined || item > max) {
        max = item;
      }
    }
  }

  return max;
}

/**
 * Finds the minimum numeric value in an array
 */
export function getMin(array: unknown): Optional<number> {
  if (!Array.isArray(array) || array.length === 0) return undefined;

  let min: number | undefined = undefined;

  for (const item of array) {
    if (typeof item === 'number' && isFinite(item)) {
      if (min === undefined || item < min) {
        min = item;
      }
    }
  }

  return min;
}

// Aliases
export const first = getFirst;
export const last = getLast;
export const single = getSingle;
export const count = getArrayCount;
export const max = getMax;
export const min = getMin;
