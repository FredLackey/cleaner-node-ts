const isValidArray = require('./is-valid-array');
const isValidString = require('./is-valid-string');
const isNumber = require('./is-number');
const isDate = require('./is-date');
const isEqualDate = require('./is-equal-date');
const copyObject = require('./copy-object');
const isObject = require('./is-object');

const EMPTY_OK = true;

/**
 * Finds the position of a value within an array of source values.
 * Handles date comparison specifically using `isEqualDate`.
 *
 * @param {*} value - The value to find.
 * @param {Array<*>} sources - The array of source values to search within.
 * @returns {number} The index of the value in the sources array, or -1 if not found.
 */
const findPosition = (value, sources) => {
  if (isDate(value)) {
    return sources.findIndex(source => isEqualDate(value, source));
  }
  return sources.indexOf(value);
};

/**
 * Determines the replacement value for a given current value based on source and target arrays.
 * If the current value is found in the sources array, its corresponding value from the targets array is returned,
 * but only if the source and target values are of the same basic type (string, number, or date).
 * Otherwise, the original current value is returned.
 *
 * @param {*} curValue - The current value to potentially replace.
 * @param {Array<*>} sources - The array of source values.
 * @param {Array<*>} targets - The array of target values.
 * @returns {*} The corresponding target value if found and type-compatible, otherwise the original `curValue`.
 */
const getValue = (curValue, sources, targets) => {
  const posInSource = findPosition(curValue, sources);
  if (posInSource === -1) {
    return curValue;
  }
  const newValue = targets[posInSource];
  const sameType = (
    (isValidString(curValue, EMPTY_OK) && isValidString(newValue, EMPTY_OK)) ||
    (isNumber(curValue) && isNumber(newValue)) ||
    (isDate(curValue) && isDate(newValue))
  );
  return sameType ? newValue : curValue;
};

/**
 * Internal recursive function to replace values within an object or array structure.
 * Modifies the input object/array directly unless a copy was made initially.
 * Uses a cache to handle circular references.
 *
 * @param {object|Array} itemOrItems - The object or array to process.
 * @param {Array<*>} sources - The array of source values to look for.
 * @param {Array<*>} targets - The array of corresponding target values.
 * @param {object} cache - An object to track processed items.
 * @param {Array} cache.items - Array storing references to items already processed.
 */
const replace = (itemOrItems, sources, targets, cache) => {

  if (isValidArray(itemOrItems, EMPTY_OK)) {
    if (isValidArray(itemOrItems)) {
      itemOrItems.forEach(item => replace(item, sources, targets, cache));
    }
    return;
  }

  if (!isObject(itemOrItems) || cache.items.includes(itemOrItems)) {
    return;
  }

  cache.items.push(itemOrItems);

  Object.keys(itemOrItems).filter(key => (
    isValidString(itemOrItems[key], EMPTY_OK) ||
    isNumber(itemOrItems[key]) ||
    isDate(itemOrItems[key])
  )).forEach(key => {

    const curValue = itemOrItems[key];
    const newValue = getValue(curValue, sources, targets);

    if (curValue !== newValue) {
      itemOrItems[key] = newValue;
    }

  });
  

  const arrays = Object.keys(itemOrItems).filter(key => isValidArray(itemOrItems[key]));
  arrays.forEach(key => replace(itemOrItems[key], sources, targets, cache));

  const objects = Object.keys(itemOrItems).filter(key => isObject(itemOrItems[key]));
  objects.forEach(key => replace(itemOrItems[key], sources, targets, cache));

};

/**
 * Recursively replaces values within an object or array structure.
 * Traverses the structure and replaces any primitive value (string, number, date)
 * found in the `sources` array with the corresponding value from the `targets` array at the same index.
 * Replacement only occurs if the source and target values are of the same type (string, number, or date).
 * Handles nested objects, arrays, and circular references.
 * Can operate on the original structure or a deep clone.
 *
 * @param {object|Array} itemOrItems - The object or array structure to process.
 * @param {Array<*>} sources - An array of values to search for.
 * @param {Array<*>} targets - An array of replacement values, corresponding to `sources`.
 * @param {boolean} [clone=false] - If true, creates a deep clone of `itemOrItems` before replacing values. Otherwise, modifies the original.
 * @throws {Error} If `sources` or `targets` are not arrays, or if they have different lengths.
 * @returns {object|Array} The processed structure with values replaced.
 */
const replaceValues = (itemOrItems, sources, targets, clone) => {
  if (!isValidArray(sources)) {
    throw new Error('sources must be an array');
  }
  if (!isValidArray(targets)) {
    throw new Error('targets must be an array');
  }
  if (sources.length !== targets.length) {
    throw new Error('sources and targets must be the same length');
  }
  const value = clone ? copyObject(itemOrItems) : itemOrItems;
  const cache = {
    items: []
  };
  replace(value, sources, targets, cache);
  return value;
};

module.exports = replaceValues;
