const isObject = require('./is-object');
const isValidArray = require('./is-valid-array');
const isDefined = require('./is-defined');

/**
 * Internal recursive function to remove a specific property from objects within a structure (object or array).
 * Modifies the input object/array directly.
 * Uses a cache to handle circular references.
 *
 * @param {object|Array} obj - The object or array to process.
 * @param {string} prop - The name of the property to remove.
 * @param {object} cache - An object to track processed items.
 * @param {Array} cache.items - Array storing references to items already processed.
 */
const remove = (obj, prop, cache) => {  
  if (isValidArray(obj)) {
    obj.forEach(x => remove(x, prop, cache));
    return;
  }
  if (!isObject(obj) || cache.items.includes(obj)) {
    return;
  }
  cache.items.push(obj);
  if (isDefined(obj[prop])) {
    Reflect.deleteProperty(obj, prop);
  }

  Object.keys(obj)
    .filter(key => (key && isObject(obj[key])))
    .forEach(key => remove(obj[key], prop, cache));

  Object.values(obj)
    .filter(key => (key && isValidArray(key)))
    .forEach(key => remove(obj[key], prop, cache));
  
};

/**
 * Recursively removes a specified property from an object and any nested objects or objects within arrays.
 * Modifies the original object/array directly.
 * Handles circular references.
 *
 * @param {object|Array} obj - The object or array from which to remove the property.
 * @param {string} prop - The name of the property to remove.
 * @returns {object|Array} The original object or array, modified in place.
 */
const removeProperty = (obj, prop) => {
  const cache = {
    items: []
  };
  remove(obj, prop, cache);
  return obj;
};

module.exports = removeProperty;
