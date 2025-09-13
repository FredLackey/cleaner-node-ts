/**
 * Date conversion functions
 */

import type { Optional } from '../types';

/**
 * Converts a Date object to its Unix epoch timestamp (seconds)
 * @param date - Date to convert
 * @returns Unix timestamp in seconds, or undefined if invalid
 */
export function toEpoch(date: Date): Optional<number> {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return undefined;
  }

  return Math.floor(date.getTime() / 1000);
}

/**
 * Converts a Unix epoch timestamp (seconds) to a JavaScript Date object
 * @param timestamp - Unix timestamp in seconds
 * @returns Date object, or undefined if invalid
 */
export function fromEpoch(timestamp: number): Optional<Date> {
  if (typeof timestamp !== 'number' || !isFinite(timestamp)) {
    return undefined;
  }

  return new Date(timestamp * 1000);
}

/**
 * Converts an ISO 8601 date string to a JavaScript Date object
 * @param isoString - ISO 8601 formatted date string
 * @returns Date object, or undefined if invalid
 */
export function fromIsoDate(isoString: string): Optional<Date> {
  if (!isoString || typeof isoString !== 'string') {
    return undefined;
  }

  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return undefined;
    }
    return date;
  } catch {
    return undefined;
  }
}

/**
 * Converts a short date string (YYYY-MM-DD or YYYY/MM/DD) to a Date object
 * @param shortDate - Short date string
 * @returns Date object, or undefined if invalid
 */
export function fromShortDate(shortDate: string): Optional<Date> {
  if (!shortDate || typeof shortDate !== 'string') {
    return undefined;
  }

  // Accept both YYYY-MM-DD and YYYY/MM/DD formats
  const match = shortDate.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (!match?.[1] || !match[2] || !match[3]) {
    return undefined;
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // 0-indexed
  const day = parseInt(match[3], 10);

  const date = new Date(year, month, day);

  // Validate the date
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return undefined;
  }

  return date;
}

/**
 * Checks if a value represents the "zero date" (epoch or constant)
 * @param value - Value to check
 * @returns true if value represents zero/epoch date
 */
export function isZeroDate(value: any): boolean {
  if (!value) {
    return false;
  }

  // Check if it's a Date at epoch
  if (value instanceof Date) {
    return value.getTime() === 0;
  }

  // Check if it's a timestamp at 0
  if (typeof value === 'number') {
    return value === 0;
  }

  // Check if it's a string representation of epoch
  if (typeof value === 'string') {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date.getTime() === 0;
  }

  return false;
}
