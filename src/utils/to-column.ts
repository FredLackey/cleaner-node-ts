const isValidString = require('./is-valid-string');
const isNumber = require('./is-number');
const isBoolean = require('./is-boolean');

/**
 * Formats an array of values (strings, numbers, booleans) into a single column of strings,
 * padded to the width of the longest value.
 * Filters out non-string/number/boolean values.
 * Converts numbers and booleans to their string representations.
 *
 * @param {Array<any>} values - The array of values to format.
 * @returns {string[]} An array of strings, each padded to the maximum width.
 */
const toColumn = values => {

  const structure = [].concat(values).filter(x => (isNumber(x) || isBoolean(x) || isValidString(x))).map(value => {

    return isValidString(value, true)
      ? value
      : isNumber(value)
        ? `${value}`
        : isBoolean(value)
          ? value
            ? 'true'
            : 'false'
          : undefined;
  }).map(value => ({
    value,
    length: value.length
  }));

  const maxLength = structure.reduce((max, { length }) => Math.max(max, length), 0);

  return structure.map(column => {
    return column.value.padEnd(maxLength, ' ');
  });

};

module.exports = toColumn;
