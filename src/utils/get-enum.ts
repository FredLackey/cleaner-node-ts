const isValidObject = require('./is-valid-object');
const isValidString = require('./is-valid-string');
const { ENUM_KEYS } = require('../constants');

/**
 * Retrieves the enum value from an object.
 * The function looks for a specific key in the object (from a predefined list of ENUM_KEYS)
 * and returns the string value associated with that key.
 *
 * @param {object} obj The object to search for an enum value.
 * @returns {string|null} The enum value if found and valid, otherwise null.
 */
const getEnum = (obj) => {

  if (!isValidObject(obj)) {
    return null;
  }

  const keys = Object.keys(obj).filter(x => ENUM_KEYS.includes(x));
  if (keys.length !== 1) {
    return null;
  }
  if (!isValidString(obj[keys[0]])) {
    return null;
  }
  return obj[keys[0]];
};

module.exports = getEnum;
