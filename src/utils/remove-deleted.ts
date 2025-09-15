const isDeleted        = require('./is-deleted');
const isObject         = require('./is-object');
const isValidArray = require('./is-valid-array');

const EMPTY_OK = true;

/**
 * Internal recursive function to process items (objects or arrays) and remove elements marked as deleted.
 * Uses a cache to handle circular references.
 *
 * @param {*} value - The item (object, array, or other value) to process.
 * @param {Function} fn - The function used by `isDeleted` to determine if an item is marked as deleted.
 * @param {object} cache - An object to track processed items.
 * @param {Array} cache.items - Array storing references to items already processed.
 * @param {*} deletedValue - The value to return for items identified as deleted at the object level.
 * @returns {*} The processed value, with deleted items removed or replaced.
 */
const processItem = (value, fn, cache, deletedValue) => {

  if (!isValidArray(value, EMPTY_OK) && !isObject(value)) {
    return value;
  }

  if (isValidArray(value, EMPTY_OK)) {
    value = value.filter(x => (x && !isDeleted(x, fn)));
    for (let i = 0; i < value.length; i += 1) {
      value[i] = processItem(value[i], fn, cache, deletedValue);
    }
    return value;
  }

  if (isDeleted(value, fn)) {
    return deletedValue;
  }

  if (cache.items.includes(value)) {
    return value;
  }

  cache.items.push(value);

  Object.keys(value).forEach(key => {
    value[key] = processItem(value[key], fn, cache, deletedValue);
  });

  return value; 
};

/**
 * Recursively removes items marked as deleted from a nested structure (objects and arrays).
 * Uses the `isDeleted` function with a provided checker function `fn` to identify deleted items.
 * Deleted items within arrays are filtered out.
 * Entire objects identified as deleted are replaced with `deletedValue` (defaults to null).
 * Handles circular references.
 *
 * @param {*} value - The object, array, or other value to process.
 * @param {Function} fn - The function passed to `isDeleted` to check if an item is deleted.
 * @param {*} [deletedValue=null] - The value to replace objects that are identified as deleted. Defaults to null.
 * @returns {*} The processed structure with deleted items removed or replaced.
 */
const removeDeleted = (value, fn, deletedValue = null) => {

  const cache = {
    items: []
  };

  return processItem(value, fn, cache, deletedValue);
};

module.exports = removeDeleted;
