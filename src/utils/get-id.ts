const isValidString = require('./is-valid-string');
const isObject          = require('./is-object');
const isNumber          = require('./is-number');
const isDefined         = require('./is-defined');
const copyObject        = require('./copy-object');

const KEYS = ['id', '_id'];

/**
 * Extracts an ID from an item.
 * If the input is already a string or number, it's returned directly.
 * If the input is an object, it looks for properties named 'id' or '_id' (in that order)
 * and returns the value if it's a string or number.
 * Operates on a deep copy of the object to avoid side effects.
 * @param {object|string|number} itemOrId The item (object) or the ID itself (string or number).
 * @returns {string|number|undefined} The extracted ID, or undefined if no valid ID is found.
 */
const getId = (itemOrId) => {

  if (isNumber(itemOrId) || isValidString(itemOrId)) {
    return itemOrId;
  }

  if (!isObject(itemOrId)) {
    return undefined;
  }

  const copy = copyObject(itemOrId);
  if (isValidString(copy) || isNumber(copy)) {  // Some objects are just a value, such as the Mongo ObjectId
    return copy;
  }

  const key = KEYS.find(x => (
    x && (isNumber(copy[x]) || isValidString(copy[x]))
  ));

  return key
    ? copy[key]
    : undefined;
};

module.exports = getId;
