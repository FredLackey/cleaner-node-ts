import isValidArray from './is-valid-array';
import isObject from './is-object';
import stringify from './stringify';

/**
 * Filters an array to contain only unique objects, preserving the original order.
 * Non-object elements are ignored.
 * Uniqueness can be determined by strict equality (===) or by comparing stringified versions.
 *
 * @param {Array<any>} values - The array containing potential objects.
 * @param {boolean} [strict=true] - If true, uses strict equality for comparison. If false, compares based on JSON stringification.
 * @returns {Array<object>} A new array containing only the unique objects from the input. Returns the original input if it's not a valid array.
 */
const uniqueObjects = (values: any[], strict: boolean = true): object[] | any[] => {
  if (!isValidArray(values)) { return values; }
  const cache: (object | string)[] = [];
  const results: object[] = [];
  [].concat(values).filter(isObject).forEach(x => {

    const cacheValue = strict ? x : stringify(x);
    if (cache.includes(cacheValue)) {
      return;
    }
    cache.push(cacheValue);

    results.push(x);
  });
  return results;
};

export default uniqueObjects;
