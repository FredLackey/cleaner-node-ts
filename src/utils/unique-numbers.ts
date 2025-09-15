import isValidArray from './is-valid-array';
import isNumber from './is-number';

/**
 * Filters an array to contain only unique numbers, preserving the original order.
 * Non-numeric elements are ignored.
 * It handles both number primitives and string representations of numbers.
 *
 * @param {Array<any>} values - The array containing potential numbers.
 * @returns {Array<number|string>} A new array containing only the unique numeric values from the input, preserving their original types (number or string). Returns the original input if it's not a valid array.
 */
const uniqueNumbers = (values: any): any => {
  if (!isValidArray(values)) { return values; }
  const cache = [];
  const results = [];
  [].concat(values).filter(isNumber).forEach(x => {

    if (cache.includes(Number(x))) {
      return;
    }
    cache.push(Number(x));

    results.push(x);
  });
  return results;
};

export default uniqueNumbers;
