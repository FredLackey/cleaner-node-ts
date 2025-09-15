const isValidObject = require('./is-valid-object');
const isValidArray = require('./is-valid-array');
const isValidString = require('./is-valid-string');
const getEnum = require('./get-enum');

/**
 * Extracts enum values from a given object or array of objects.
 *
 * If the input is an array, it filters for valid objects and maps them to their enum values using `getEnum`.
 * If the input is a single object, it extracts keys that are all uppercase (potential enum containers),
 * then maps these to their enum values using `getEnum`.
 * Filters out any null or invalid string results.
 *
 * @param {object|Array<object>} objOrArray The object or array of objects to extract enums from.
 * @returns {Array<string>} An array of valid enum strings found.
 */
const getEnums = (objOrArray) => {

  let values = [];

  if (isValidArray(objOrArray)) {
    values = [].concat(objOrArray).filter(x => isValidObject(x)).map(x => getEnum(x));
    return values.filter(x => isValidString(x));
  }

  if (!isValidObject(objOrArray)) {
    return [];
  }

  const keys = Object.keys(objOrArray)
    .filter(key => key && key === key.toUpperCase())
    .filter(key => isValidObject(objOrArray[key]));
  if (keys.length === 0) {
    return [];
  }

  values = keys.map(key => getEnum(objOrArray[key]));
  return values.filter(x => isValidString(x));

};

module.exports = getEnums;
