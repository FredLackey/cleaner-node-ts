const parse = require('./parse');

/**
 * Converts a blockdate string (YYYYMMDDHHmmssSSS) into a JavaScript Date object.
 * @param {string} value The blockdate string.
 * @returns {Date|null} The corresponding Date object, or null if the input is invalid.
 */
const fromBlockDate = (value) => {

  const item = parse(value);
  if (!item) { return null; }

  if (item.hour.value < 0) {
    return new Date(item.year.value, item.month.value, item.day.value);
  }
  if (item.second.value < 0) {
    return new Date(item.year.value, item.month.value, item.day.value, item.hour.value, item.minute.value);
  }
  if (item.millisecond.value < 0) {
    return new Date(item.year.value, item.month.value, item.day.value, item.hour.value, item.minute.value, item.second.value);
  }
  
  return new Date(item.year.value, item.month.value, item.day.value, item.hour.value, item.minute.value, item.second.value, item.millisecond.value);

};

module.exports = fromBlockDate;
