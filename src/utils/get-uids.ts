const getUid = require('./get-uid');

/**
 * Converts an array of items into an array of UIDs (unique identifiers).
 *
 * Each item in the input array is processed by the `getUid` function.
 * The behavior of `getUid` can be modified by the `strict` parameter.
 *
 * @param {Array<Object|string>} items - An array of items from which to extract UIDs.
 *   Can be objects or strings that can be resolved to UIDs.
 * @param {boolean} [strict=false] - Passed to `getUid`. If true, `getUid` may
 *   be more stringent in its UID extraction, potentially throwing errors for ambiguous inputs.
 * @returns {Array<string>} An array of string UIDs.
 */
const getUids = (items, strict = false) => {
  return [].concat(items).map(item => getUid(item, strict));
};

module.exports = getUids;
