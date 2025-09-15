const copyObject = require('./copy-object');
const isObject = require('./is-object');
const isValidArray = require('./is-valid-array');
const { AUDIT_FIELDS } = require('../constants');

const EMPTY_OK = true;

/**
 * Internal recursive function to remove audit fields from objects and arrays.
 * Modifies the input object/array directly unless a copy was made initially.
 * Uses a cache to handle circular references.
 *
 * @param {object|Array} itemOrItems - The object or array to process.
 * @param {object} cache - An object to track processed items and prevent infinite loops.
 * @param {Array} cache.items - An array storing references to items already processed.
 */
const remove = (itemOrItems, cache) => {

  if (isValidArray(itemOrItems, EMPTY_OK)) {
    if (isValidArray(itemOrItems)) {
      itemOrItems.forEach(item => remove(item, cache));
    }
    return;
  }

  if (!isObject(itemOrItems) || cache.items.includes(itemOrItems)) {
    return;
  }

  cache.items.push(itemOrItems);

  const keys = Object.keys(itemOrItems).filter(key => AUDIT_FIELDS.includes(key));
  keys.forEach(key => Reflect.deleteProperty(itemOrItems, key));

  const arrays = Object.keys(itemOrItems).filter(key => isValidArray(itemOrItems[key]));
  arrays.forEach(key => remove(itemOrItems[key], cache));

  const objects = Object.keys(itemOrItems).filter(key => isObject(itemOrItems[key]));
  objects.forEach(key => remove(itemOrItems[key], cache));

};

/**
 * Recursively removes standard audit fields (defined in `constants.AUDIT_FIELDS`)
 * from an object or an array of objects.
 * Can operate on the original object/array or create a deep copy first.
 *
 * @param {object|Array} itemOrItems - The object or array to remove audit fields from.
 * @param {boolean} [makeCopy=false] - If true, creates a deep copy before removing fields. Otherwise, modifies the original.
 * @returns {object|Array} The processed object or array with audit fields removed.
 */
const removeAuditFields = (itemOrItems, makeCopy = false) => {
  const cache = {
    items: []
  };
  const value = makeCopy ? copyObject(itemOrItems) : itemOrItems;
  remove(value, cache);
  return value;
};

module.exports = removeAuditFields;
