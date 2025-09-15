/* eslint-disable no-use-before-define */
const isDefined         = require('./is-defined');
const isObject          = require('./is-object');
const isValidArray  = require('./is-valid-array');
const isValidString = require('./is-valid-string');
const removeSuffix      = require('./remove-suffix');

const DEFAULT_PARAMS = {
  id   : '',
  uid  : '',
  audit: [],
  force: false,
  nulls: false 
};
const DELIMETERS = ['-', '_'];

/**
 * Removes the ID property from an object if the UID property exists (or if force is true).
 * @param {object} item The object to process.
 * @param {object} params Configuration parameters (id, uid, force).
 */
const removeId = (item, params) => {
  if (!isObject(item) || !isValidString(params.id) || !isDefined(item[params.id])) {
    return;
  }
  if (!params.force && (!params.uid || !isDefined(item[params.uid]))) {
    return;
  }
  Reflect.deleteProperty(item, params.id);
  if (isValidString(params.id) && isValidString(params.uid)) {
    if (isDefined(item[params.uid]) && !isDefined(item[params.id])) {
      item[params.id] = item[params.uid];
      Reflect.deleteProperty(item, params.uid);
    }
  }
};
/**
 * Removes audit trail properties (specified in params.audit) from an object.
 * @param {object} item The object to process.
 * @param {object} params Configuration parameters (audit).
 */
const removeAudit = (item, params) => {
  if (!isObject(item) || !isValidArray(params.audit)) {
    return;
  }
  Object.keys(item).filter(x => (x && params.audit.includes(x))).forEach(key => {
    Reflect.deleteProperty(item, key);
  });
};
/**
 * Moves the value from the UID property to the ID property if the ID property is missing.
 * @param {object} item The object to process.
 * @param {object} params Configuration parameters (id, uid).
 */
const moveUid = (item, params) => {
  if (!item) { return; }
  if (!isValidString(params.uid) || !isValidString(params.id)) {
    return;
  }
  if (isDefined(item[params.id]) || !isDefined(params.uid)) {
    return;
  }
  item[params.id] = item[params.uid];
  Reflect.deleteProperty(item, params.uid);
};
  
/**
 * Renames properties ending with '-uid' or '_uid' to the corresponding key without the suffix.
 * @param {object} item The object to process.
 * @param {object} params Configuration parameters (id, uid).
 */
const moveIds = (item, params) => {
  if (!item || !isValidString(params.uid) || !isValidString(params.id)) {
    return;
  }
  for (let d = 0; d < DELIMETERS.length; d += 1) {
    const suffix = `${DELIMETERS[d]}${params.uid}`;
    const keysWithSuffix = Object.keys(item)
      .filter(x => (x && x.endsWith(suffix) && x.length > suffix.length));
    for (let s = 0; s < keysWithSuffix.length; s += 1) {
      const oldKey = keysWithSuffix[s];
      const newKey = removeSuffix(oldKey, suffix);
      if (!isDefined(item[oldKey]) || isDefined(item[newKey])) {
        continue;
      }
      item[newKey] = item[oldKey];
      Reflect.deleteProperty(item, oldKey);
    }
  } 
};
/**
 * Renames properties ending with '-id', '_id', '-uid', or '_uid' to the base key.
 * @param {object} item The object to process.
 * @param {object} params Configuration parameters (id, uid).
 */
const trimIds = (item, params) => {
  if (!item) { return; }

  [params.uid, params.id].filter(isValidString).forEach(idKey => {
    DELIMETERS.forEach(delim => {
    const suffix = `${delim}${idKey}`;
    Object.keys(item)
      .filter(x => (x && x.endsWith(suffix) && x.length > suffix.length))
      .forEach(oldKey => {

        const newKey = removeSuffix(oldKey, suffix);
        if (isDefined(item[oldKey]) && !isDefined(item[newKey])) {
          item[newKey] = item[oldKey];
          Reflect.deleteProperty(item, oldKey);
        }
      });
    });
  });
};
/**
 * Removes properties with null values from an object unless params.nulls is true.
 * @param {object} item The object to process.
 * @param {object} params Configuration parameters (nulls).
 */
const removeNulls = (item, params) => {
  if (!isObject(item) || params.nulls === true) {
    return;
  }
  Object.keys(item).filter(x => (x && item[x] === null)).forEach(key => {
    Reflect.deleteProperty(item, key);
  });
};

/**
 * Recursively processes an array of items or nested arrays.
 * @param {Array<object|Array>} items The array of items to process.
 * @param {object} params Configuration parameters passed to processItem.
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
 * Processes a single item object: removes IDs, audits, handles UIDs, trims IDs, removes nulls, and recurses into nested objects/arrays.
 * @param {object} item The item to process.
 * @param {object} params Configuration parameters (id, uid, audit, force, nulls, cache).
 */
const processItem = (item, params) => {
  if (!isObject(item)) {
    return;
  }
  
  if (!params.cache.items.includes(item)) {
    params.cache.items.push(item);
    removeId(item, params);
    removeAudit(item, params);
    moveIds(item, params);
    moveUid(item, params);
    trimIds(item, params);
    removeNulls(item, params);
  }

  Object.keys(item).filter(key => (isObject(item[key]))).forEach(key => {
    processItem(item[key], params);
  });
  Object.keys(item).filter(key => (isValidArray(item[key]))).forEach(key => {
    processItems(item[key], params);
  });
};

/**
 * Cleans a DTO (Data Transfer Object) or an array of DTOs by applying various transformations like removing audit fields, handling ID/UID properties, and removing nulls.
 * This function modifies the input object(s) in place.
 * @param {object|Array<object>} itemOrItems The DTO or array of DTOs to clean.
 * @param {object} [params=DEFAULT_PARAMS] Configuration options:
 * @param {string} [params.id=''] The name of the primary ID field.
 * @param {string} [params.uid=''] The name of the unique ID field (often used before the primary ID is assigned).
 * @param {string[]} [params.audit=[]] An array of property names considered audit fields to be removed.
 * @param {boolean} [params.force=false] If true, forces removal of the `id` field even if `uid` is not present.
 * @param {boolean} [params.nulls=false] If true, keeps properties with null values; otherwise, they are removed.
 */
const cleanDto = (itemOrItems, params = DEFAULT_PARAMS) => {
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

module.exports = cleanDto;
