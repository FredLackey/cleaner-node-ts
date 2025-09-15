const isValidArray = require('./is-valid-array');

/**
 * Checks if a value is an array that contains no elements.
 * 
 * This function first validates that the input is a valid array, then checks
 * if it's empty. It returns true only if the value is a valid array with zero elements.
 * 
 * @param {*} array - The value to check
 * @returns {boolean} True if the value is an array with no elements, false otherwise
 * 
 * @example
 * isEmptyArray([]);           // true
 * isEmptyArray([1, 2, 3]);    // false
 * isEmptyArray(null);         // false
 * isEmptyArray(undefined);    // false
 * isEmptyArray("string");     // false
 * isEmptyArray({});           // false
 */
const isEmptyArray = (array) => {
  return isValidArray(array, true) && !isValidArray(array, false);
};

module.exports = isEmptyArray;