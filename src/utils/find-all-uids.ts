const isUidFormat = require('./is-uid-format');
const isValidArray = require('./is-valid-array');
const isObject = require('./is-object');
const isValidString = require('./is-valid-string');

const EMPTY_OK = true;

/**
 * Recursively finds all UID-formatted strings within nested objects and arrays.
 * @param {object|Array} itemOrItems The object or array to search within.
 * @param {object} cache An object to keep track of visited items ({items: Array}) and found UIDs ({uids: Array}).
 * @private
 */
const findAll = (itemOrItems, cache) => {
  if (isValidArray(itemOrItems, EMPTY_OK)) {
    if (isValidArray(itemOrItems)) {
      for (let i = 0; i < itemOrItems.length; i += 1) {
        findAll(itemOrItems[i], cache);
      }
    }
    return;
  }
  if (!isObject(itemOrItems) || cache.items.includes(itemOrItems)) {
    return;
  }
  
  cache.items.push(itemOrItems);

  Object.keys(itemOrItems).filter(key => isUidFormat(itemOrItems[key])).map(key => itemOrItems[key]).forEach(uid => {
    if (!cache.uids.includes(uid)) {
      cache.uids.push(uid);
    }
  });
  
  const objects = Object.keys(itemOrItems).filter(key => isObject(itemOrItems[key]));
  objects.forEach(key => findAll(itemOrItems[key], cache));

  const arrays = Object.keys(itemOrItems).filter(key => isValidArray(itemOrItems[key]));
  arrays.forEach(key => findAll(itemOrItems[key], cache));

};

/**
 * Finds all unique strings matching the UID format (e.g., 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx') 
 * within an object or array, including nested structures.
 * @param {object|Array} itemOrItems The object or array to search.
 * @returns {string[]} An array of unique UID strings found.
 */
const findAllUids = itemOrItems => {
  const cache = {
    items: [],
    uids: []
  };
  findAll(itemOrItems, cache);
  return cache.uids;
};

module.exports = findAllUids;
