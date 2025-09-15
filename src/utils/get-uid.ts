const isObject     = require('./is-object');
const copyObject   = require('./copy-object');
const isUidFormat  = require('./is-uid-format');
const isGuidFormat = require('./is-guid-format');

const KEYS = ['uid'];

/**
 * Extracts a UID (or optionally a GUID) from an item or returns the input if it's already a valid UID/GUID format.
 * Checks for a `uid` property within an object if the input is an object.
 * @param {string|object} itemOrId The item to extract the UID from. Can be a string (potential UID/GUID) or an object containing a `uid` property.
 * @param {boolean} [strict=false] If true, only accepts the UID format. If false, accepts both UID and GUID formats.
 * @returns {string|undefined} The extracted UID/GUID, or undefined if not found or the input is invalid.
 */
const getUid = (itemOrId, strict = false) => {

  if (isUidFormat(itemOrId)) {
    return itemOrId;
  }
  if (!strict && isGuidFormat(itemOrId)) {
    return itemOrId;
  }

  if (!isObject(itemOrId)) {
    return undefined;
  }

  const copy = copyObject(itemOrId);

  const key = KEYS.find(x => (
    x && (isUidFormat(copy[x]) || (!strict && isGuidFormat(copy[x])))
  ));

  return key
    ? copy[key]
    : undefined;
};

module.exports = getUid;
