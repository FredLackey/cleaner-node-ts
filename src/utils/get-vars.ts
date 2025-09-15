const isNumber = require('./is-number');
const isValidString = require('./is-valid-string');
const isBoolean = require('./is-boolean');

/**
 * Retrieves environment variables, optionally filtering for proper naming conventions and valid value types.
 * @param {boolean} [proper=true] If true, only includes variables with all-uppercase keys.
 * @param {boolean} [valid=true] If true, only includes variables whose values are numbers, booleans, or non-empty strings.
 * @returns {object} An object containing the filtered environment variables, sorted alphabetically by key.
 */
const getVars = (proper = true, valid = true) => {
  const result = {};
  Object
    .keys(process.env)
    .filter(key => (key && (!proper || key === key.toUpperCase())))
    .filter(key => (key && (!valid || (
      isNumber(process.env[key]) || 
      isBoolean(process.env[key]) || 
      isValidString(process.env[key])
    ))))
    .sort()
    .forEach(key => {
      result[key] = process.env[key];
    });
  return result;
};

module.exports = getVars;
