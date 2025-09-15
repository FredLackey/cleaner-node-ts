/**
 * Checks if a value is a plain JavaScript object (not null, not an array).
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is an object, false otherwise.
 */
const isObject = (value: any): boolean => (
  typeof value === 'object' && 
  value !== null && 
  !(value instanceof Array));

export default isObject;
