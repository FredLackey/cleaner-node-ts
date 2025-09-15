const isValidString = require('./is-valid-string');

/**
 * Checks if a string matches a common phone number format using a regular expression.
 * Allows for optional country codes, parentheses around area codes, and spaces/dashes as separators.
 *
 * @param {string} value - The string to validate as a phone number.
 * @returns {boolean} True if the string matches the phone number pattern, false otherwise.
 */
const isPhoneNumber = (value) => {

  if (!isValidString(value)) {
    return false;
  }

  // Regular expression to match phone number formats
  // Optional country code: +1 or +12 or +123
  // Optional parentheses around area code: (123)
  // Space or dash separators are optional
  const pattern = /^(\+\d{1,3}[- ]?)?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;

  return pattern.test(value);
};

module.exports = isPhoneNumber;

// Example usage:
// console.log(validatePhoneNumber("+1 123-456-7890"));  // true
// console.log(validatePhoneNumber("+12 (123) 456-7890")); // true
// console.log(validatePhoneNumber("+123 123 456 7890")); // true
// console.log(validatePhoneNumber("(123) 456-7890"));    // true
// console.log(validatePhoneNumber("123-456-7890"));      // true
// console.log(validatePhoneNumber("1234567890"));        // true
// console.log(validatePhoneNumber("+1 (123) 456-78900")); // false (too many digits)
// console.log(validatePhoneNumber("+1234 123 456 7890")); // false (country code too long)
