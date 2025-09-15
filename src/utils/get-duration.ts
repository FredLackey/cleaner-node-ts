const c = require('../constants');
const isValidString = require('./is-valid-string');

/**
 * Calculates the duration between two timestamps (or Date objects) and formats it.
 * @param {number|Date} start The starting timestamp (milliseconds since epoch) or Date object.
 * @param {number|Date} end The ending timestamp (milliseconds since epoch) or Date object.
 * @returns {object} An object containing:
 *   - `values`: An object with the duration broken down into `weeks`, `days`, `hours`, `mins`, `seconds`, and `ms`.
 *   - `text`: A string representation of the duration in the format 'WW:DD:HH:MM:SS.sss', omitting leading zero components (e.g., 'HH:MM:SS.sss' or 'MM:SS.sss').
 */
const getDuration = (start, end) => {

  let ms = end - start;

  const weeks = Math.floor(ms / c.NUMBERS.MS.PER.WEEK);
  ms %= c.NUMBERS.MS.PER.WEEK;

  const days = Math.floor(ms / c.NUMBERS.MS.PER.DAY);
  ms %= c.NUMBERS.MS.PER.DAY;

  const hours = Math.floor(ms / c.NUMBERS.MS.PER.HOUR);
  ms %= c.NUMBERS.MS.PER.HOUR;

  const mins = Math.floor(ms / c.NUMBERS.MS.PER.MINUTE);
  ms %= c.NUMBERS.MS.PER.MINUTE;

  const seconds = Math.floor(ms / c.NUMBERS.MS.PER.SECOND);
  ms %= c.NUMBERS.MS.PER.SECOND;

  const weekText = weeks > 0 ? `${weeks}`.padStart(2, '0') : '';
  const dayText = (weekText || days > 0) ? `${days}`.padStart(2, '0') : '';
  const hourText = (dayText || hours > 0) ? `${hours}`.padStart(2, '0') : '';
  const minText = (hourText || mins > 0) ? `${mins}`.padStart(2, '0') : '';
  const secondText = (minText || seconds > 0) ? `${seconds}`.padStart(2, '0') : '';
  const msText = (secondText || ms > 0) ? `${ms}`.padStart(3, '0') : '';

  const durText = [
    weekText,
    dayText,
    hourText,
    minText,
    secondText
  ].filter(x => (isValidString(x))).join(':');

  return {
    values: {
      weeks,
      days,
      hours,
      mins,
      seconds,
      ms
    },
    text: `${durText}.${msText}`,
  };

};

module.exports = getDuration;
