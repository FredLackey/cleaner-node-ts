/**
 * Date manipulation functions
 */

import type { Optional } from '../types';

/**
 * Returns the current date and time
 * @returns Current date
 */
export function now(): Date {
  return new Date();
}

/**
 * Adds a specified number of days to a date
 * @param date - Date to add days to
 * @param days - Number of days to add (can be negative)
 * @returns New date with days added, or undefined if invalid
 */
export function addDays(date: Date, days: number): Optional<Date> {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return undefined;
  }

  if (typeof days !== 'number' || !isFinite(days)) {
    return undefined;
  }

  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Adds a specified number of minutes to a date
 * @param date - Date to add minutes to
 * @param minutes - Number of minutes to add (can be negative)
 * @returns New date with minutes added, or undefined if invalid
 */
export function addMinutes(date: Date, minutes: number): Optional<Date> {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return undefined;
  }

  if (typeof minutes !== 'number' || !isFinite(minutes)) {
    return undefined;
  }

  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

/**
 * Adds a specified number of months to a date
 * @param date - Date to add months to
 * @param months - Number of months to add (can be negative)
 * @returns New date with months added, or undefined if invalid
 */
export function addMonths(date: Date, months: number): Optional<Date> {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return undefined;
  }

  if (typeof months !== 'number' || !isFinite(months)) {
    return undefined;
  }

  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Adds a specified number of years to a date
 * @param date - Date to add years to
 * @param years - Number of years to add (can be negative)
 * @returns New date with years added, or undefined if invalid
 */
export function addYears(date: Date, years: number): Optional<Date> {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return undefined;
  }

  if (typeof years !== 'number' || !isFinite(years)) {
    return undefined;
  }

  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Finds the earliest date from an array of Date objects
 * @param dates - Array of Date objects
 * @returns Earliest date, or undefined if invalid
 */
export function minDate(dates: Date[]): Optional<Date> {
  if (!Array.isArray(dates) || dates.length === 0) {
    return undefined;
  }

  const validDates = dates.filter((d) => d instanceof Date && !isNaN(d.getTime()));
  if (validDates.length === 0) {
    return undefined;
  }

  return new Date(Math.min(...validDates.map((d) => d.getTime())));
}

/**
 * Finds the latest date from an array of Date objects
 * @param dates - Array of Date objects
 * @returns Latest date, or undefined if invalid
 */
export function maxDate(dates: Date[]): Optional<Date> {
  if (!Array.isArray(dates) || dates.length === 0) {
    return undefined;
  }

  const validDates = dates.filter((d) => d instanceof Date && !isNaN(d.getTime()));
  if (validDates.length === 0) {
    return undefined;
  }

  return new Date(Math.max(...validDates.map((d) => d.getTime())));
}

/**
 * Calculates the duration between two timestamps or Date objects
 * @param start - Start date/timestamp
 * @param end - End date/timestamp
 * @returns Formatted duration string, or empty string if invalid
 */
export function getDuration(start: Date | number, end: Date | number): string {
  try {
    const startMs = start instanceof Date ? start.getTime() : Number(start);
    const endMs = end instanceof Date ? end.getTime() : Number(end);

    if (!isFinite(startMs) || !isFinite(endMs)) {
      return '';
    }

    const diff = Math.abs(endMs - startMs);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''}, ${hours % 24} hour${hours % 24 !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}, ${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}, ${seconds % 60} second${seconds % 60 !== 1 ? 's' : ''}`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
  } catch {
    return '';
  }
}

/**
 * Gets the full name of the day of the week for a given Date
 * @param date - Date object or ISO date string
 * @returns Day name (e.g., "Monday"), or empty string if invalid
 */
export function getDayName(date: Date | string): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (!(d instanceof Date) || isNaN(d.getTime())) {
      return '';
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[d.getDay()] || '';
  } catch {
    return '';
  }
}
