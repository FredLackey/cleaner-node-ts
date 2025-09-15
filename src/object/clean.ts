/**
 * Object cleaning and manipulation functions
 */

import { AUDIT_FIELDS } from '../constants';
import { isObject, isSet } from '../validation';
import { isValidObject, isValidArray } from '../validation/value-checks';
import { copyObject } from './copy';
import { toResponse } from './transform';

/**
 * Recursively processes a single object, removing properties with `undefined` values.
 * @private
 */
const cleanItem = <T>(item: T, data: { cache: any[] }): T => {
  if (!isValidObject(item)) {
    return item;
  }
  if (data.cache.includes(item)) {
    return item;
  }
  data.cache.push(item);

  const obj = item as any;
  const keys = Object.keys(obj);
  const deleteKeys = keys.filter(x => (x && typeof obj[x] === 'undefined'));
  deleteKeys.forEach(x => delete obj[x]);

  const objects = keys.filter(x => (x && isValidObject(obj[x])));
  objects.forEach(x => cleanItem(obj[x], data));

  const arrays = keys.filter(x => (x && isValidArray(obj[x], false)));
  arrays.forEach(x => cleanArray(obj[x], data));

  return item;
};

/**
 * Recursively processes an array, cleaning each object or nested array within it.
 * @private
 */
const cleanArray = <T>(items: T, data: { cache: any[] }): T => {
  if (!isValidArray(items)) {
    return items;
  }

  // Child items may be objects or arrays
  [].concat(items as any).forEach(x => {
    if (isValidObject(x)) {
      cleanItem(x, data);
    }
    if (isValidArray(x)) {
      cleanArray(x, data);
    }
  });

  return items;
};

/**
 * Recursively cleans an object or array by removing properties with `undefined` values
 */
export function cleanObject<T>(itemOrItems: T, copyFirst: boolean = false): T {
  if (!isValidObject(itemOrItems) && !isValidArray(itemOrItems)) {
    return itemOrItems;
  }

  const data = {
    items: copyFirst ? copyObject(itemOrItems) : itemOrItems,
    cache: []
  };
  
  if (isValidArray(data.items)) {
    cleanArray(data.items, data);
  }

  if (isValidObject(data.items)) {
    cleanItem(data.items, data);
  }

  return toResponse(itemOrItems, data.items) as T;
}

/**
 * Recursively removes standard audit fields from an object or array
 */
export function removeAuditFields<T>(obj: T): T {
  if (!isSet(obj)) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => removeAuditFields(item)) as unknown as T;
  }

  if (isObject(obj)) {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (!AUDIT_FIELDS.includes(key as any)) {
        cleaned[key] = removeAuditFields(value);
      }
    }
    return cleaned;
  }

  return obj;
}

/**
 * Recursively removes a specified property from an object and nested structures
 */
export function removeProperty<T>(obj: T, propertyName: string): T {
  if (!isSet(obj) || !propertyName) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => removeProperty(item, propertyName)) as unknown as T;
  }

  if (isObject(obj)) {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key !== propertyName) {
        cleaned[key] = removeProperty(value, propertyName);
      }
    }
    return cleaned;
  }

  return obj;
}

/**
 * Recursively removes items marked as deleted (using a checker function) from a structure
 */
export function removeDeleted<T>(obj: T, checkFn?: (item: unknown) => boolean): T {
  if (!isSet(obj)) return obj;

  // Default check function
  const isDeleted =
    checkFn ||
    ((item: any) => {
      if (!isObject(item)) return false;
      return (
        item.deleted === true ||
        item.isDeleted === true ||
        item.deletedAt !== undefined ||
        item.deleted_at !== undefined
      );
    });

  if (Array.isArray(obj)) {
    return obj
      .filter((item) => !isDeleted(item))
      .map((item) => removeDeleted(item, checkFn)) as unknown as T;
  }

  if (isObject(obj)) {
    if (isDeleted(obj)) {
      return undefined as unknown as T;
    }

    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = removeDeleted(value, checkFn);
      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue;
      }
    }
    return cleaned;
  }

  return obj;
}

/**
 * Cleans DTOs by removing audit fields, handling ID/UID properties, removing nulls etc.
 * Modifies input in place.
 */
export function cleanDto<T>(dto: T, removeNulls = true): T {
  if (!isSet(dto)) return dto;

  if (Array.isArray(dto)) {
    return dto.map((item) => cleanDto(item, removeNulls)) as unknown as T;
  }

  if (isObject(dto)) {
    const obj = dto as any;

    // Remove audit fields
    for (const field of AUDIT_FIELDS) {
      delete obj[field];
    }

    // Normalize ID fields
    if (obj._id && !obj.id) {
      obj.id = obj._id;
      delete obj._id;
    }

    // Clean nested objects
    for (const [key, value] of Object.entries(obj)) {
      if (value === null && removeNulls) {
        delete obj[key];
      } else if (value !== undefined) {
        obj[key] = cleanDto(value, removeNulls);
      }
    }

    return obj;
  }

  return dto;
}

/**
 * Recursively replaces values within an object or array structure based on source/target arrays
 */
export function replaceValues<T>(obj: T, sourceValues: unknown[], targetValues: unknown[]): T {
  if (!isSet(obj) || !Array.isArray(sourceValues) || !Array.isArray(targetValues)) {
    return obj;
  }

  if (sourceValues.length !== targetValues.length) {
    return obj;
  }

  const replacementMap = new Map();
  for (let i = 0; i < sourceValues.length; i++) {
    replacementMap.set(sourceValues[i], targetValues[i]);
  }

  function replace(value: unknown): unknown {
    if (replacementMap.has(value)) {
      return replacementMap.get(value);
    }

    if (Array.isArray(value)) {
      return value.map((item) => replace(item));
    }

    if (isObject(value)) {
      const result: any = {};
      for (const [key, val] of Object.entries(value)) {
        result[key] = replace(val);
      }
      return result;
    }

    return value;
  }

  return replace(obj) as T;
}
