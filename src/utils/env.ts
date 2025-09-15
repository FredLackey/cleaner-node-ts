const isValidString = require('./is-valid-string');
const isNumber = require('./is-number');
const isBoolean = require('./is-boolean');

/**
 * Retrieves environment variables from process.env.
 * Filters for keys that are all uppercase and have string, number, or boolean values.
 * Sorts the keys alphabetically.
 * @returns {object} An object containing the filtered and sorted environment variables.
 */
const getVars = () => {

  if (!process || !process.env) {
    return {};
  }

  const result = {};

  const keys = Object.keys(process.env).filter(x => (x && x === x.toUpperCase() && 
    (isValidString(process.env[x]) || isNumber(process.env[x]) || isBoolean(process.env[x]))  
  ));
  keys.sort();
  keys.forEach(x => {
    result[x] = process.env[x];
  });

  return result;

};

module.exports = {
  getVars
};
