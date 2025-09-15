const isValidArray    = require('./is-valid-array');
const isObject   = require('./is-object');
const stringify  = require('./stringify');
const hashString = require('./hash-string');

/**
 * Generates a hash value for a given object or array by converting it to a string representation
 * and then computing its hash. This function provides a consistent way to create
 * hash values for complex data structures, useful for caching, comparison, and data integrity checks.
 * 
 * @param {Object|Array} obj - The object or array to be hashed. Must be a valid object or array type.
 * @param {boolean} [strict=false] - If true, only accepts objects (not arrays). If false, accepts both objects and arrays.
 * @returns {string|undefined} The hash string of the object/array, or undefined if the input is not a valid type
 * @throws {Error} May throw an error if the object contains circular references or non-serializable properties
 * 
 * @example
 * // Hash a simple object
 * const user = { name: 'John', age: 30 };
 * const hash = hashObject(user);
 * console.log(hash); // Returns a hash string like "a1b2c3d4..."
 * 
 * @example
 * // Hash an array (non-strict mode)
 * const items = ['apple', 'banana', 'cherry'];
 * const hash = hashObject(items);
 * console.log(hash); // Returns a hash string
 * 
 * @example
 * // Strict mode - only accepts objects
 * const hash1 = hashObject(['array'], true);  // Returns undefined
 * const hash2 = hashObject({key: 'value'}, true);  // Returns hash string
 * 
 * @example
 * // Returns undefined for non-objects/arrays
 * const hash = hashObject('not an object');
 * console.log(hash); // undefined
 * 
 * @example
 * // Hash a complex nested structure
 * const config = {
 *   database: { host: 'localhost', port: 5432 },
 *   features: ['auth', 'logging'],
 *   settings: { debug: true }
 * };
 * const hash = hashObject(config);
 * console.log(hash); // Returns consistent hash for this object structure
 * 
 * @since 1.0.0
 * @see {@link stringify} for object serialization details
 * @see {@link hashString} for string hashing implementation
 * @see {@link isObject} for object validation logic
 * @see {@link isArray} for array validation logic
 */
const hashObject = (obj, strict = false) => {

  if (strict) {
    if (!isObject(obj)) { return undefined; }
  } else {
    if (!isObject(obj) && !isValidArray(obj, true)) { return undefined; }
  }

  const stringified = stringify(obj);
  return hashString(stringified);
};

module.exports = hashObject;