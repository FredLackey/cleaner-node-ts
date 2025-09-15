import isValidString from './is-valid-string';
import getEmail from './get-email';

/**
 * Checks if a string is a valid email address format.
 * It uses `getEmail` to potentially clean the input and then compares it to the original value.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string matches the cleaned email format, false otherwise.
 */
const isEmail = (value: any): boolean => {
  const email = getEmail(value);
  return isValidString(email) && value === email;
};

export default isEmail;
