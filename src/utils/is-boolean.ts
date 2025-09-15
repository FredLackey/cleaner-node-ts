/**
 * Checks if a value is strictly true or false.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is exactly true or false, false otherwise.
 */
const isBoolean = (value: any): boolean => {
  return (value === true) || (value === false);
};

export default isBoolean;
