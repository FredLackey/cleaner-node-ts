/**
 * Format validation functions
 */

import {
  EMAIL_REGEX,
  URL_REGEX,
  GUID_REGEX,
  UID_REGEX,
  ISO_DATE_REGEX,
  SHORT_DATE_REGEX,
  BLOCK_DATE_REGEX,
  PHONE_REGEX,
  IP_REGEX,
  CAMEL_CASE_REGEX,
  PASCAL_CASE_REGEX,
  SNAKE_CASE_REGEX,
  KEBAB_CASE_REGEX,
} from '../constants';

/**
 * Checks if a string is a valid email address format
 */
export function isEmail(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length === 0) return false;
  return EMAIL_REGEX.test(trimmed);
}

/**
 * Checks if a string is a valid URL (starts with http/https and is parseable)
 */
export function isUrl(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!URL_REGEX.test(trimmed)) return false;
  try {
    new URL(trimmed);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a value conforms to the standard GUID format
 */
export function isGuidFormat(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return GUID_REGEX.test(value.trim());
}

/**
 * Checks if a value is a valid UID format (32 alphanumeric chars)
 */
export function isUidFormat(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return UID_REGEX.test(value.trim());
}

/**
 * Checks if a string represents a valid ISO 8601 date format
 */
export function isIsoDate(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!ISO_DATE_REGEX.test(trimmed)) return false;
  const date = new Date(trimmed);
  return !isNaN(date.getTime());
}

/**
 * Checks if a string represents a valid date in YYYY/MM/DD or YYYY-MM-DD format
 */
export function isShortDate(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!SHORT_DATE_REGEX.test(trimmed)) return false;
  const normalized = trimmed.replace(/\//g, '-');
  const date = new Date(normalized);
  return !isNaN(date.getTime());
}

/**
 * Checks if a value is a valid blockdate format
 */
export function isBlockDate(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return BLOCK_DATE_REGEX.test(value.trim());
}

/**
 * Checks if a string matches a common phone number format
 */
export function isPhoneNumber(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length < 7 || trimmed.length > 20) return false;
  return PHONE_REGEX.test(trimmed);
}

/**
 * Checks if a string represents a valid IPv4 address
 */
export function isIpAddress(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();

  // Allow localhost and common special IPs
  if (trimmed === 'localhost' || trimmed === '0.0.0.0') return true;

  if (!IP_REGEX.test(trimmed)) return false;

  // Validate each octet
  const parts = trimmed.split('.');
  return parts.every((part) => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255;
  });
}

/**
 * Checks if a string is in camelCase format
 */
export function isCamelCase(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && CAMEL_CASE_REGEX.test(trimmed);
}

/**
 * Checks if a string is in PascalCase format
 */
export function isPascalCase(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && PASCAL_CASE_REGEX.test(trimmed);
}

/**
 * Checks if a string is in snake_case format
 */
export function isSnakeCase(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && SNAKE_CASE_REGEX.test(trimmed);
}

/**
 * Checks if a string is in kebab-case format
 */
export function isKebabCase(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && KEBAB_CASE_REGEX.test(trimmed);
}

/**
 * Checks if a string is a valid Semantic Versioning (SemVer) string
 */
export function isSemver(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  try {
    // We'll use the semver package for this when we implement it
    // For now, basic regex check
    const semverRegex =
      /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    return semverRegex.test(value.trim());
  } catch {
    return false;
  }
}
