const isObject = require('./is-object');
const isFunction = require('./is-function');

/**
 * Checks if an item is considered "deleted" based on a provided checking function.
 * Throws an error if the provided checker `fn` is not a function.
 * Returns false if the item is not an object.
 * Otherwise, returns the result of calling the checker function `fn` with the item.
 *
 * @param {object} item - The item (expected to be an object) to check.
 * @param {Function} fn - A function that takes the item and returns true if it's considered deleted, false otherwise.
 * @returns {boolean} The result of the checker function `fn`, or false if the item isn't an object.
 * @throws {Error} If `fn` is not a function.
 */
const isDeleted = (item, fn) => {
  if (!isFunction) { throw new Error('isDeleted fn is not a function!'); }
  if (!isObject) { return false; }
  return fn(item);
};

module.exports = isDeleted;
