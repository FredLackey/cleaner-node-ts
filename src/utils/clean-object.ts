const isValidObject = require('./is-valid-object');
const isValidArray = require('./is-valid-array');
const copyObject = require('./copy-object');
const toResponse = require('./to-response');

/**
 * Recursively processes a single object, removing properties with `undefined` values.
 * @private
 * @param {Object} item - The object to clean.
 * @param {object} data - Internal data object containing the cache.
 * @param {Array} data.cache - Cache to track processed objects and prevent infinite loops.
 * @returns {Object} The cleaned item.
 */
const cleanItem = (item, data) => {

  if (!isValidObject(item)) {
    return item;
  }
  if (data.cache.includes(item)) {
    return item;
  }
  data.cache.push(item);

  const keys = Object.keys(item);
  const deleteKeys = keys.filter(x => (x && typeof item[x] === 'undefined'));
  deleteKeys.forEach(x => delete item[x]);

  const objects = keys.filter(x => (x && isValidObject(item[x])));
  objects.forEach(x => cleanItem(item[x], data));

  const arrays = keys.filter(x => (x && isValidArray(item[x], false)));
  // eslint-disable-next-line no-use-before-define
  arrays.forEach(x => cleanArray(item[x], data));

  return item;

};

/**
 * Recursively processes an array, cleaning each object or nested array within it.
 * @private
 * @param {Array} items - The array of items to clean.
 * @param {object} data - Internal data object containing the cache.
 * @param {Array} data.cache - Cache to track processed objects and prevent infinite loops.
 * @returns {Array} The cleaned array.
 */
const cleanArray = (items, data) => {

  if (!isValidArray(items)) {
    return items;
  }

  // Child items may be objects or arrays
  [].concat(items).forEach(x => {
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
 * Recursively cleans an object or array by removing properties with `undefined` values.
 * 
 * @param {Object|Array} itemOrItems - The object or array to clean.
 * @param {boolean} [copyFirst=false] - Whether to work on a copy of the input (true) or modify in place (false).
 * @returns {Object|Array|*} - The cleaned object/array with `undefined` properties removed, or the original input if not a valid object/array.
 * 
 * @example
 * // Clean an object in place, removing undefined properties
 * const myObject = { a: 1, b: undefined, c: { d: undefined, e: 5 } };
 * const cleanedObject = cleanObject(myObject);
 * // cleanedObject will be { a: 1, c: { e: 5 } }
 * 
 * @example
 * // Clean an array of objects without modifying the original
 * const myArray = [{ id: 1, name: undefined }, { id: undefined, value: 'test' }];
 * const cleanedArray = cleanObject(myArray, true);
 * // cleanedArray will be [{ id: 1 }, { value: 'test' }]
 */
const cleanObject = (itemOrItems, copyFirst = false) => {

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

  return toResponse(itemOrItems, data.items);

};

module.exports = cleanObject;
