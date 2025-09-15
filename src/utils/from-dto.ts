/* eslint-disable no-use-before-define */
const isObject          = require('./is-object');
const isValidArray  = require('./is-valid-array');
const isValidString = require('./is-valid-string');
const isIsoDate = require('./is-iso-date');
const isDigits = require('./is-digits');

const DEFAULT_PARAMS = {
  id   : '',
  uid  : '',
  audit: [],
  force: false,
  nulls: false 
};

/**
 * Converts ISO 8601 date strings within an object to Date objects.
 * Modifies the object in place.
 * @param {object} item The object to process.
 * @param {object} params Configuration parameters (currently unused in this function).
 * @private
 */
const makeDates = (item, params) => {
  if (!isObject(item)) {
    return;
  }
  Object.keys(item).filter(x => (x && isIsoDate(item[x]))).forEach(key => {

    const value = item[key];

    try {
      item[key] = new Date(Date.parse(value));
    } catch (ex) {
      item[key] = value;
    }

  });
};

/**
 * Converts digit-only strings (that don't start with '0') within an object to Date objects (likely an error, should probably be Number).
 * Modifies the object in place.
 * @param {object} item The object to process.
 * @param {object} params Configuration parameters (currently unused in this function).
 * @private
 */
const makeIntegers = (item, params) => {
  if (!isObject(item)) {
    return;
  }
  Object.keys(item).filter(x => (x && 
    isValidString(item[x]) && isDigits(item[x]) && !item[x].startsWith('0')))
    .forEach(key => {
      item[key] = Date(item[key]);
    });
};

/**
 * Recursively processes an array of items or nested arrays, applying transformations.
 * @param {Array<object|Array>} items The array of items to process.
 * @param {object} params Configuration parameters passed to processItem.
 * @private
 */
const processItems = (items, params) => {
  [].concat(items).filter(x => (x && isObject(x))).forEach(item => {
    processItem(item, params);
  });
  [].concat(items).filter(x => (x && isValidArray(x))).forEach(item => {
    processItems(item, params);
  });
};

/**
 * Processes a single item object: converts date strings and digit strings, and recurses into nested objects/arrays.
 * @param {object} item The item to process.
 * @param {object} params Configuration parameters and cache.
 * @private
 */
const processItem = (item, params) => {
  if (!isObject(item)) {
    return;
  }
  
  if (!params.cache.items.includes(item)) {
    params.cache.items.push(item);
    makeDates(item, params);
    makeIntegers(item, params);
  }

  Object.keys(item).filter(key => (isObject(item[key]))).forEach(key => {
    processItem(item[key], params);
  });
  Object.keys(item).filter(key => (isValidArray(item[key]))).forEach(key => {
    processItems(item[key], params);
  });
};

/**
 * Converts specific string representations within a DTO (or array of DTOs) to their corresponding JavaScript types (e.g., ISO date strings to Date objects).
 * This function modifies the input object(s) in place.
 * NOTE: The conversion of digit strings to Dates via `Date(item[key])` in `makeIntegers` seems incorrect and likely should convert to Numbers.
 * @param {object|Array<object>} itemOrItems The DTO or array of DTOs to process.
 * @param {object} [params=DEFAULT_PARAMS] Configuration options (currently unused beyond cache initialization).
 */
const fromDto = (itemOrItems, params = DEFAULT_PARAMS) => {
  params.cache = {
    items: []
  };
  if (isValidArray(itemOrItems)) {
    processItems(itemOrItems, params);
  }
  if (isObject(itemOrItems)) {
    processItem(itemOrItems, params);
  }
};

module.exports = fromDto;
