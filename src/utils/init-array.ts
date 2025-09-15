import isDefined from './is-defined';

/**
 * Ensures the input value is an array and filters out undefined elements.
 * If the input is not an array, it wraps it in an array.
 * @param {*} value The value to initialize as an array.
 * @returns {Array<*>} An array containing the defined elements from the input value.
 */
const initArray = (value: any): any[] => {
  return [].concat(value).filter(isDefined);
};

export default initArray;
