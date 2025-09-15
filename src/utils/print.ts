const isValidArray = require('./is-valid-array');
const isValidString = require('./is-valid-string');

/**
 * Prints the key-value pairs of an object to the console in a formatted manner.
 * Keys starting with an underscore are ignored.
 * Keys are sorted alphabetically.
 * Values are formatted based on their type (string, boolean, array).
 * Arrays are printed with each element on a new line, aligned with the key.
 * A separator line is printed before the object content.
 *
 * @param {object} obj - The object to print.
 */
const print = obj => {
  const keys = Object.keys(obj).filter(isValidString);
  let pad  = 0;
  keys.forEach(key => { if (key.length > pad) { pad = key.length; } });
  keys.sort();
  const strings = [];
  keys.filter(key => (!key.startsWith('_'))).forEach(key => {

    if (['undefined', 'string', 'boolean'].includes(typeof obj[key])) {
      strings.push(`${key.padStart(pad, ' ')} : ${obj[key]}`);
    } else if (isValidArray(obj[key], false)) {
      for (let i = 0; i < obj[key].length; i += 1) {
        const prefix = (i === 0) ? key : '';
        strings.push(`${prefix.padStart(pad, ' ')} : ${obj[key][i]}`);
      }
    } else if (isValidArray(obj[key], true)) {
      strings.push(`${key.padStart(pad, ' ')} : (empty)`);
    } else {
      strings.push(`${key.padStart(pad, ' ')} : (unknown)`);
    }
  });
  console.log(''.padStart(80, '-'));
  strings.forEach(value => {
    console.log(value);
  });
}; 

module.exports = print;
