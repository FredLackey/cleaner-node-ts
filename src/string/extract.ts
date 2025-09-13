/**
 * String extraction functions
 */

import { EMAIL_REGEX, BRACKET_PAIRS } from '../constants';
import type { Optional } from '../types/common';
import { isValidString } from '../validation/value-checks';

/**
 * Extracts the first valid email address found in a string
 */
export function getEmail(text: unknown): Optional<string> {
  if (!isValidString(text, false)) return undefined;

  // More comprehensive email regex for extraction
  const emailExtractRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const match = text.match(emailExtractRegex);

  if (match && match.length > 0) {
    // Validate the first match with strict regex
    const email = match[0];
    if (EMAIL_REGEX.test(email)) {
      return email;
    }
  }

  return undefined;
}

/**
 * Extracts all valid email addresses found in a string
 */
export function getEmails(text: unknown): string[] {
  if (!isValidString(text, false)) return [];

  const emailExtractRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailExtractRegex) || [];

  // Filter matches through strict validation
  return matches.filter((email) => EMAIL_REGEX.test(email));
}

/**
 * Gets the leading whitespace (prefix padding) of a string
 */
export function getPadPrefix(value: unknown): string {
  if (!isValidString(value, false)) return '';

  const match = value.match(/^(\s*)/);
  return match ? match[1]! : '';
}

/**
 * Gets the trailing whitespace (suffix padding) of a string
 */
export function getPadSuffix(value: unknown): string {
  if (!isValidString(value, false)) return '';

  const match = value.match(/(\s*)$/);
  return match ? match[1]! : '';
}

/**
 * Calculates the length of leading (prefix) and trailing (suffix) whitespace in a string
 */
export function getPads(value: unknown): { prefix: number; suffix: number } {
  if (!isValidString(value, false)) return { prefix: 0, suffix: 0 };

  const prefix = getPadPrefix(value).length;
  const suffix = getPadSuffix(value).length;

  return { prefix, suffix };
}

/**
 * Calculates the byte size of a string using the specified encoding
 */
export function getStringSize(value: unknown, encoding: BufferEncoding = 'utf8'): number {
  if (!isValidString(value, false)) return 0;

  return Buffer.byteLength(value, encoding);
}

/**
 * Finds the longest common starting substring among an array of strings
 */
export function getSubstring(strings: unknown): Optional<string> {
  if (!Array.isArray(strings) || strings.length === 0) return undefined;

  // Filter to valid strings
  const validStrings = strings.filter((s) => isValidString(s, false));
  if (validStrings.length === 0) return undefined;
  if (validStrings.length === 1) return validStrings[0];

  // Find common prefix
  let common = '';
  const firstStr = validStrings[0]!;

  for (let i = 0; i < firstStr.length; i++) {
    const char = firstStr[i]!;
    if (validStrings.every((str) => str[i] === char)) {
      common += char;
    } else {
      break;
    }
  }

  return common;
}

/**
 * Finds the matching bracket pair that encloses the given string value
 */
export function getBracket(value: unknown): Optional<{ open: string; close: string }> {
  if (!isValidString(value) || value.length < 2) return undefined;

  const firstChar = value[0];
  const lastChar = value[value.length - 1];

  if (firstChar && lastChar && firstChar in BRACKET_PAIRS) {
    if (BRACKET_PAIRS[firstChar] === lastChar) {
      return { open: firstChar, close: lastChar };
    }
  }

  return undefined;
}

/**
 * Extracts the innermost content enclosed by a specified pair of opening and closing brackets/tokens
 */
export function getInnerTokens(
  text: unknown,
  openToken: string,
  closeToken: string,
): Optional<string> {
  if (!isValidString(text, false)) return undefined;
  if (!openToken || !closeToken) return undefined;

  const openIndex = text.lastIndexOf(openToken);
  if (openIndex === -1) return undefined;

  const closeIndex = text.indexOf(closeToken, openIndex + openToken.length);
  if (closeIndex === -1) return undefined;

  return text.substring(openIndex + openToken.length, closeIndex);
}

/**
 * Extracts segments from a string that are enclosed by specified opening and closing brackets
 */
export function getTokenizedSegments(
  text: unknown,
  openToken: string,
  closeToken: string,
): string[] {
  if (!isValidString(text, false)) return [];
  if (!openToken || !closeToken) return [];

  const segments: string[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    const openIndex = text.indexOf(openToken, currentIndex);
    if (openIndex === -1) break;

    const closeIndex = text.indexOf(closeToken, openIndex + openToken.length);
    if (closeIndex === -1) break;

    segments.push(text.substring(openIndex + openToken.length, closeIndex));
    currentIndex = closeIndex + closeToken.length;
  }

  return segments;
}

/**
 * Checks if a string contains a target substring, with optional case sensitivity
 */
export function hasString(source: unknown, target: unknown, caseSensitive = true): boolean {
  if (!isValidString(source, false) || !isValidString(target, false)) return false;

  if (caseSensitive) {
    return source.includes(target);
  } else {
    return source.toLowerCase().includes(target.toLowerCase());
  }
}

/**
 * Removes a specified prefix from the beginning of a string, potentially multiple times
 */
export function removePrefix(value: unknown, prefix: unknown, removeAll = false): Optional<string> {
  if (!isValidString(value, false) || !isValidString(prefix, false)) return undefined;

  let result = value;

  if (removeAll) {
    while (result.startsWith(prefix)) {
      result = result.slice(prefix.length);
    }
  } else if (result.startsWith(prefix)) {
    result = result.slice(prefix.length);
  }

  return result;
}

/**
 * Removes a specified suffix from the end of a string, potentially multiple times
 */
export function removeSuffix(value: unknown, suffix: unknown, removeAll = false): Optional<string> {
  if (!isValidString(value, false) || !isValidString(suffix, false)) return undefined;

  let result = value;

  if (removeAll) {
    while (result.endsWith(suffix)) {
      result = result.slice(0, -suffix.length);
    }
  } else if (result.endsWith(suffix)) {
    result = result.slice(0, -suffix.length);
  }

  return result;
}

/**
 * Splits a string at the first occurrence of a specified separator
 */
export function splitFirst(value: unknown, separator: unknown): Optional<[string, string]> {
  if (!isValidString(value, false) || !isValidString(separator, false)) return undefined;

  const index = value.indexOf(separator);
  if (index === -1) return [value, ''];

  return [value.slice(0, index), value.slice(index + separator.length)];
}

/**
 * Removes leading and trailing quote characters (") from a string
 */
export function unquote(value: unknown): Optional<string> {
  if (!isValidString(value, false)) return undefined;

  if (value.startsWith('"') && value.endsWith('"') && value.length > 1) {
    return value.slice(1, -1);
  }

  return value;
}

/**
 * Alias for unquote
 */
export const unQuote = unquote;

/**
 * Replaces consecutive occurrences of specified target characters within a string with a single instance
 */
export function undouble(value: unknown, target: unknown = ' '): Optional<string> {
  if (!isValidString(value, false)) return undefined;
  if (!isValidString(target, false) || target.length === 0) return value;

  const regex = new RegExp(`(${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})+`, 'g');
  return value.replace(regex, target);
}
