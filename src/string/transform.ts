/**
 * String transformation functions
 */

import type { Optional } from '../types/common';
import { isValidString } from '../validation/value-checks';

/**
 * Converts a string to camelCase
 */
export function toCamelCase(value: unknown): Optional<string> {
  if (!isValidString(value)) return undefined;

  // Split on non-alphanumeric characters
  const words = value
    .trim()
    .split(/[^a-zA-Z0-9]+/)
    .filter((w) => w.length > 0);
  if (words.length === 0) return '';

  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

/**
 * Converts a string to PascalCase
 */
export function toPascalCase(value: unknown): Optional<string> {
  if (!isValidString(value)) return undefined;

  // Split on non-alphanumeric characters
  const words = value
    .trim()
    .split(/[^a-zA-Z0-9]+/)
    .filter((w) => w.length > 0);
  if (words.length === 0) return '';

  return words
    .map((word) => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

/**
 * Converts a string to snake_case
 */
export function toSnakeCase(value: unknown): Optional<string> {
  if (!isValidString(value)) return undefined;

  // Handle camelCase and PascalCase
  const withSpaces = value
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');

  // Split on non-alphanumeric characters and join with underscore
  return withSpaces
    .split(/[^a-zA-Z0-9]+/)
    .filter((w) => w.length > 0)
    .map((w) => w.toLowerCase())
    .join('_');
}

/**
 * Converts a string to kebab-case
 */
export function toKebabCase(value: unknown): Optional<string> {
  if (!isValidString(value)) return undefined;

  // Handle camelCase and PascalCase
  const withSpaces = value
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');

  // Split on non-alphanumeric characters and join with hyphen
  return withSpaces
    .split(/[^a-zA-Z0-9]+/)
    .filter((w) => w.length > 0)
    .map((w) => w.toLowerCase())
    .join('-');
}

/**
 * Converts a JavaScript value to a JSON string, safely handling circular references
 */
export function stringify(value: unknown): string {
  const seen = new WeakSet();
  return JSON.stringify(value, (_key, val) => {
    if (typeof val === 'object' && val !== null) {
      if (seen.has(val)) {
        return;
      }
      seen.add(val);
    }
    return val;
  });
}

/**
 * Converts various input types (boolean, string, number) into a boolean value
 */
export function toBoolean(value: unknown): Optional<boolean> {
  if (value === true || value === false) return value;

  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    if (lower === 'true' || lower === 'yes' || lower === '1' || lower === 'on') {
      return true;
    }
    if (lower === 'false' || lower === 'no' || lower === '0' || lower === 'off') {
      return false;
    }
  }

  if (typeof value === 'number') {
    if (value === 1) return true;
    if (value === 0) return false;
  }

  return undefined;
}

/**
 * Converts a UID or GUID string into the standard lowercase GUID format
 */
export function toGuidFormat(value: unknown): Optional<string> {
  if (!isValidString(value)) return undefined;

  const cleaned = value.replace(/[^a-fA-F0-9]/g, '').toLowerCase();
  if (cleaned.length !== 32) return undefined;

  return [
    cleaned.slice(0, 8),
    cleaned.slice(8, 12),
    cleaned.slice(12, 16),
    cleaned.slice(16, 20),
    cleaned.slice(20, 32),
  ].join('-');
}

/**
 * Converts a GUID or UID string into the standard 32-character uppercase UID format
 */
export function toUidFormat(value: unknown): Optional<string> {
  if (!isValidString(value)) return undefined;

  const cleaned = value.replace(/[^a-fA-F0-9]/g, '').toUpperCase();
  if (cleaned.length !== 32) return undefined;

  return cleaned;
}
