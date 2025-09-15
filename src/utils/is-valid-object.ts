import isObject from './is-object';

/**
 * Checks if a value is a non-empty plain JavaScript object (not an array or null).
 *
 * @param {*} obj - The value to check.
 * @returns {boolean} True if the value is an object with at least one key, false otherwise.
 */
const isValidObject = (obj: any): boolean => {
  if (!isObject(obj)) {
    return false;
  }

  return Object.keys(obj).length > 0;
};

export default isValidObject;
