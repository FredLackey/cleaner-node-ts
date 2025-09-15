const getId = require('./get-id');

/**
 * Converts an array of items or IDs into an array of IDs.
 *
 * Each item in the input array is processed by the `getId` function.
 * If an element is already an ID (string), it's returned as is.
 * If an element is an object, `getId` will attempt to extract its ID.
 *
 * @param {Array<Object|string>} itemsOrIds - An array containing objects or string IDs.
 * @returns {Array<string>} An array of string IDs.
 */
const getIds = (itemsOrIds) => {
  return [].concat(itemsOrIds).map(x => getId(x));
};

module.exports = getIds;
