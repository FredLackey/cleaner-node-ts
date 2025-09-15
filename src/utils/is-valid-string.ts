/**
 * Checks if a value is a string and optionally if it's non-empty after trimming whitespace.
 *
 * @param {*} value - The value to check.
 * @param {boolean} [isEmptyOkay=false] - If true, an empty or whitespace-only string is considered valid. If false (default), the string must contain non-whitespace characters.
 * @returns {boolean} True if the value is a string and meets the emptiness condition, false otherwise.
 */
const isValidString = (value, isEmptyOkay) => {
  return (typeof value === 'string') && (isEmptyOkay || value.trim().length > 0);
};

module.exports = isValidString;
