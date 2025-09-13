/**
 * Date formatting functions
 */

import type { Optional } from '../types';

/**
 * Formats a Date object into a blockdate string (YYYYMMDDHHmmssSSS)
 * @param date - Date to format
 * @returns Blockdate string, or undefined if invalid
 */
export function getBlockDate(date: Date): Optional<string> {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return undefined;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
}

/**
 * Converts a blockdate string to a JavaScript Date object
 * @param blockdate - Blockdate string (YYYYMMDDHHmmssSSS)
 * @returns Date object, or undefined if invalid
 */
export function fromBlockDate(blockdate: string): Optional<Date> {
  if (!blockdate || typeof blockdate !== 'string') {
    return undefined;
  }

  // Remove non-digits
  const cleaned = blockdate.replace(/\D/g, '');

  // Must be at least 8 characters (YYYYMMDD)
  if (cleaned.length < 8) {
    return undefined;
  }

  // Parse components
  const year = parseInt(cleaned.substring(0, 4), 10);
  const month = parseInt(cleaned.substring(4, 6), 10) - 1; // 0-indexed
  const day = parseInt(cleaned.substring(6, 8), 10);
  const hours = cleaned.length >= 10 ? parseInt(cleaned.substring(8, 10), 10) : 0;
  const minutes = cleaned.length >= 12 ? parseInt(cleaned.substring(10, 12), 10) : 0;
  const seconds = cleaned.length >= 14 ? parseInt(cleaned.substring(12, 14), 10) : 0;
  const milliseconds = cleaned.length >= 17 ? parseInt(cleaned.substring(14, 17), 10) : 0;

  const date = new Date(year, month, day, hours, minutes, seconds, milliseconds);

  // Validate the date
  if (isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

/**
 * Checks if a value is a valid blockdate format
 * @param value - Value to check
 * @returns true if valid blockdate format
 */
export function isBlockDate(value: any): boolean {
  if (!value || typeof value !== 'string') {
    return false;
  }

  // Remove non-digits
  const cleaned = value.replace(/\D/g, '');

  // Must be 8, 10, 12, 14, or 17 characters
  if (![8, 10, 12, 14, 17].includes(cleaned.length)) {
    return false;
  }

  // Try to parse it
  const date = fromBlockDate(value);
  return date !== undefined;
}

/**
 * Module containing blockdate utilities
 */
export const blockdate = {
  fromBlockDate,
  isBlockDate,
  getBlockDate,
  toBlockDate: getBlockDate,
};
