const isValidString = require('./is-valid-string');

/**
 * Trims leading elements from an array that are not valid strings (or are empty strings).
 * It removes elements from the beginning until the first valid string is encountered.
 * All subsequent elements (including non-valid strings) are kept.
 *
 * @param {Array<any>} lines - The array to trim from the top.
 * @returns {Array<any>} A new array with leading non-valid-string elements removed.
 */
const trimTop = lines => {
  const result    = [];
  let lastValid = -1;
  for (let i = 0; i < lines.length; i += 1) {

    if (isValidString(lines[i])) {
      result.push(lines[i]);
      lastValid = i;
      continue;
    }

    if (lastValid >= 0) {
      result.push(lines[i]);
    }

  }

  return result;
};

/**
 * Trims trailing elements from an array that are not valid strings (or are empty strings).
 * It reverses the array, trims from the top using `trimTop`, and then reverses it back.
 *
 * @param {Array<any>} lines - The array to trim from the bottom.
 * @returns {Array<any>} A new array with trailing non-valid-string elements removed.
 */
const trimBottom = lines => {
  let _lines = [].concat(lines);
  _lines.reverse();
  _lines = trimTop(_lines);
  _lines.reverse();
  return _lines;
};

/**
 * Trims both leading and trailing elements from an array that are not valid strings (or are empty strings).
 * Applies `trimTop` first, then `trimBottom` to the result.
 *
 * @param {Array<any>} lines - The array to trim from both ends.
 * @returns {Array<any>} A new array with leading and trailing non-valid-string elements removed.
 */
const trim = lines => {
  return trimBottom(trimTop(lines));
};

module.exports = {
  trim,
  trimBottom,
  trimTop
};
