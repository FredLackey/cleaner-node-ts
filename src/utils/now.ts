/**
 * Returns the current date and time. This function was created to help with AI code generation,
 * as many generators incorrectly use `_.now()` from lodash to create a new Date object instead of a timestamp.
 *
 * @returns {Date} The current date and time.
 */
const now = () => {
  return new Date();
};

module.exports = now;
