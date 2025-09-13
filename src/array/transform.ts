/**
 * Array transformation and manipulation functions
 */

import type { Nullable, Optional } from '../types/common';
import { isNumber } from '../validation';
import { isValidString } from '../validation/value-checks';

/**
 * Sorts an array containing numbers (or string representations), filtering non-numerics
 */
export function sort(array: unknown, descending = false): Nullable<number[]> {
  if (!Array.isArray(array)) return null;

  const numbers: number[] = [];

  for (const item of array) {
    if (isNumber(item)) {
      const num = typeof item === 'number' ? item : Number(item);
      numbers.push(num);
    }
  }

  return descending ? numbers.sort((a, b) => b - a) : numbers.sort((a, b) => a - b);
}

/**
 * Sorts an array in ascending order (convenience function)
 */
export function ascending(array: unknown): Nullable<number[]> {
  return sort(array, false);
}

/**
 * Sorts an array in descending order (convenience function)
 */
export function descending(array: unknown): Nullable<number[]> {
  return sort(array, true);
}

/**
 * Ensures the input value is an array and filters out undefined elements
 */
export function initArray<T>(value: unknown): T[] {
  if (!value) return [];
  if (!Array.isArray(value)) return [value as T];
  return value.filter((item) => item !== undefined) as T[];
}

/**
 * Trims leading/trailing non-valid-string elements from an array
 */
export function trimArray(array: unknown): Nullable<unknown[]> {
  if (!Array.isArray(array)) return null;
  if (array.length === 0) return [];

  let start = 0;
  let end = array.length - 1;

  // Find first valid string
  while (start <= end && !isValidString(array[start])) {
    start++;
  }

  // Find last valid string
  while (end >= start && !isValidString(array[end])) {
    end--;
  }

  if (start > end) return [];
  return array.slice(start, end + 1) as string[];
}

/**
 * Formats an array of values into a single column of strings, padded to the width of the longest value
 */
export function toColumn(values: unknown): string[] {
  if (!Array.isArray(values)) return [];

  const stringValues = values.map((v) => String(v ?? ''));
  if (stringValues.length === 0) return [];

  const maxLength = Math.max(...stringValues.map((s) => s.length));

  return stringValues.map((value) => value.padEnd(maxLength, ' '));
}

/**
 * Converts an array of delimited strings into a formatted text table with borders
 */
export function toTable(rows: unknown, delimiter = '\t', hasHeader = true): Optional<string> {
  if (!Array.isArray(rows) || rows.length === 0) return undefined;

  // Convert all rows to arrays of strings
  const data: string[][] = rows.map((row) => {
    if (typeof row === 'string') {
      return row.split(delimiter);
    }
    if (Array.isArray(row)) {
      return row.map((cell) => String(cell ?? ''));
    }
    return [String(row)];
  });

  if (data.length === 0) return undefined;

  // Calculate column widths
  const colCount = Math.max(...data.map((row) => row.length));
  const colWidths: number[] = [];

  for (let col = 0; col < colCount; col++) {
    let maxWidth = 0;
    for (const row of data) {
      const cellWidth = (row[col] || '').length;
      if (cellWidth > maxWidth) {
        maxWidth = cellWidth;
      }
    }
    colWidths.push(maxWidth);
  }

  // Build the table
  const lines: string[] = [];
  const separator = '+' + colWidths.map((w) => '-'.repeat(w + 2)).join('+') + '+';

  lines.push(separator);

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const cells = [];

    for (let col = 0; col < colCount; col++) {
      const cell = row?.[col] || '';
      cells.push(' ' + cell.padEnd(colWidths[col]!, ' ') + ' ');
    }

    lines.push('|' + cells.join('|') + '|');

    // Add separator after header
    if (hasHeader && i === 0) {
      lines.push(separator);
    }
  }

  lines.push(separator);

  return lines.join('\n');
}

/**
 * Returns a single item or an array based on the sample array
 */
export function toResult<T>(items: T[], sample: unknown): T | T[] | null {
  if (!Array.isArray(items)) return null;

  if (Array.isArray(sample)) {
    return items;
  } else {
    return items.length > 0 ? items[0]! : null;
  }
}
