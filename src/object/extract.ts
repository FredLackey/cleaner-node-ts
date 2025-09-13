/**
 * Object extraction and retrieval functions
 */

import type { Optional } from '../types/common';
import { isObject } from '../validation';
import { isGuidFormat, isUidFormat } from '../validation/format-checks';
import { isValidString } from '../validation/value-checks';

/**
 * Extracts an ID ('id' or '_id') from an object or returns the input if already an ID
 */
export function getId(item: unknown): Optional<string | number> {
  if (item === null || item === undefined) return undefined;

  // If it's already a string or number, return it
  if (typeof item === 'string' || typeof item === 'number') {
    return item;
  }

  // If it's an object, look for id fields
  if (isObject(item)) {
    const obj = item as any;
    if (obj.id !== undefined) return obj.id;
    if (obj._id !== undefined) return obj._id;
    if (obj.Id !== undefined) return obj.Id;
    if (obj.ID !== undefined) return obj.ID;
  }

  return undefined;
}

/**
 * Extracts IDs from an array of items or IDs
 */
export function getIds(items: unknown): Array<string | number> {
  if (!Array.isArray(items)) return [];

  return items.map((item) => getId(item)).filter((id) => id !== undefined);
}

/**
 * Extracts a UID/GUID from an item or returns the input if it's already valid
 */
export function getUid(item: unknown): Optional<string> {
  if (item === null || item === undefined) return undefined;

  // If it's a string, check if it's already a UID/GUID
  if (typeof item === 'string') {
    if (isUidFormat(item) || isGuidFormat(item)) {
      return item;
    }
  }

  // If it's an object, look for uid/guid fields
  if (isObject(item)) {
    const obj = item as any;

    // Check common UID/GUID field names
    const uidFields = ['uid', 'uuid', 'guid', 'UID', 'UUID', 'GUID', '_id'];

    for (const field of uidFields) {
      const value = obj[field];
      if (isValidString(value) && (isUidFormat(value) || isGuidFormat(value))) {
        return value;
      }
    }
  }

  return undefined;
}

/**
 * Extracts UIDs from an array of items
 */
export function getUids(items: unknown): string[] {
  if (!Array.isArray(items)) return [];

  return items.map((item) => getUid(item)).filter((uid) => uid !== undefined);
}

/**
 * Finds all unique UID strings within an object or array, including nested structures
 */
export function findAllUids(obj: unknown): string[] {
  const uids = new Set<string>();

  function traverse(value: unknown): void {
    if (value === null || value === undefined) return;

    // Check if the value itself is a UID
    if (typeof value === 'string' && (isUidFormat(value) || isGuidFormat(value))) {
      uids.add(value);
    }

    // Traverse arrays
    if (Array.isArray(value)) {
      value.forEach((item) => traverse(item));
    }

    // Traverse objects
    if (isObject(value)) {
      Object.values(value).forEach((val) => traverse(val));
    }
  }

  traverse(obj);
  return Array.from(uids);
}

/**
 * Retrieves the enum value from an object
 */
export function getEnum(obj: unknown, enumField = 'enum'): Optional<unknown> {
  if (!isObject(obj)) return undefined;

  const value = (obj as any)[enumField];
  return value;
}

/**
 * Extracts enum values from a given object or array of objects
 */
export function getEnums(items: unknown, enumField = 'enum'): unknown[] {
  if (!items) return [];

  if (Array.isArray(items)) {
    return items.map((item) => getEnum(item, enumField)).filter((e) => e !== undefined);
  }

  const enumValue = getEnum(items, enumField);
  return enumValue !== undefined ? [enumValue] : [];
}

/**
 * Extracts the nested 'result' property from an object recursively
 */
export function fromResult(obj: unknown): unknown {
  if (!isObject(obj)) return obj;

  let current = obj as any;

  while (current && isObject(current) && 'result' in current) {
    current = current.result;
  }

  return current;
}

/**
 * Prints the key-value pairs of an object to the console in a formatted manner
 */
export function print(obj: unknown, indent = 0): void {
  if (!isObject(obj)) {
    console.log(obj);
    return;
  }

  const spaces = ' '.repeat(indent);

  for (const [key, value] of Object.entries(obj as any)) {
    if (isObject(value)) {
      console.log(`${spaces}${key}:`);
      print(value, indent + 2);
    } else if (Array.isArray(value)) {
      console.log(`${spaces}${key}: [${value.length} items]`);
    } else {
      console.log(`${spaces}${key}: ${value}`);
    }
  }
}
