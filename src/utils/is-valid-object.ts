const isObject = require('./is-object');

/**
 * Checks if a value is a non-empty plain JavaScript object (not an array or null).
 *
 * @param {*} obj - The value to check.
 * @returns {boolean} True if the value is an object with at least one key, false otherwise.
 */
const isValidObject = (obj) => {
  if (!isObject(obj)) {
    return false;
  }

  return Object.keys(obj).length > 0;
};

module.exports = isValidObject;
