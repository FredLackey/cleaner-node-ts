import parse from './parse';
import isObject from '../is-object';

const MAX_YEAR = (new Date()).getFullYear();

/**
 * Checks if a value is a valid blockdate string.
 * @param {string} value The value to check.
 * @param {number} [maxYear=current year] The maximum allowed year.
 * @returns {boolean} True if the value is a valid blockdate string, false otherwise.
 */
const isBlockDate = (value: string, maxYear: number = MAX_YEAR): boolean => {
  const item = parse(value, maxYear);
  return isObject(item);
};

export default isBlockDate;
