import isValidString from './is-valid-string';
import isNumber from './is-number';

/**
 * Converts various input types (boolean, string, number) into a boolean value.
 * Recognizes common string representations ('1', 'TRUE', 'YES', 'Y' for true; '0', 'FALSE', 'NO', 'N' for false, case-insensitive).
 * Recognizes numbers 1 (true) and 0 (false).
 * If the input cannot be confidently converted, returns the provided default value.
 *
 * @param {*} value - The value to convert.
 * @param {boolean} [defaultValue=undefined] - The value to return if the input cannot be converted to boolean.
 * @returns {any} The boolean representation of the input, or the defaultValue.
 */
const toBoolean = (value: any, defaultValue?: any): any => {
  if (value === true || value === false) { 
    return value;
  }
  if (isValidString(value)) {
    if (['1', 'TRUE', 'YES', 'Y'].includes(value.toUpperCase())) {
      return true;
    }
    if (['0', 'FALSE', 'NO', 'N'].includes(value.toUpperCase())) {
      return false;
    }
    return defaultValue;
  }
  if (isNumber(value)) {
    if (Number(value) === 1) {
      return true;
    }
    if (Number(value) === 0) {
      return false;
    }
    return defaultValue;
  }
};

export default toBoolean;
