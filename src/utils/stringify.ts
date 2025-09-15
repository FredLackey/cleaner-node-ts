/**
 * Creates a replacer function for `JSON.stringify` that handles circular references.
 * It keeps track of objects seen using a WeakSet and returns undefined for duplicates.
 *
 * @returns {Function} A replacer function suitable for `JSON.stringify`.
 */
const getCircularReplacer = (): ((key: string, value: any) => any) => {
  const seen = new WeakSet();
  return (key: string, value: any): any => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

/**
 * Converts a JavaScript value to a JSON string, safely handling circular references.
 * Uses `JSON.stringify` with a custom replacer to prevent errors with circular structures.
 *
 * @param {*} item - The value to convert to a JSON string.
 * @returns {string} The JSON string representation of the value, handling circular references.
 */
const stringify = (item: any): string => {
  return JSON.stringify(item, getCircularReplacer());
};

export default stringify;
