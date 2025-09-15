const DEFAULT_FORMAT = 'YYYYMMDDHHmmSS:SSS';

/**
 * Formats a Date object into a blockdate string (e.g., YYYYMMDDHHmmssSSS).
 * @param {Date} [value=new Date()] The Date object to format. Defaults to the current date and time.
 * @param {string} [format=DEFAULT_FORMAT] A string indicating the desired length/precision (e.g., 'YYYYMMDD', 'YYYYMMDDHHmm'). The output string will be truncated to the length of this format string.
 * @returns {string} The formatted blockdate string.
 */
const getBlockDate = (value: Date = new Date(), format: string = DEFAULT_FORMAT): string => {

  const result = [
    `${value.getFullYear()}`,
    `${value.getMonth() + 1}`.padStart(2, '0'),
    `${value.getDate()}`.padStart(2, '0'),
    `${value.getHours()}`.padStart(2, '0'),
    `${value.getMinutes()}`.padStart(2, '0'),
    `${value.getSeconds()}`.padStart(2, '0'),
    `${value.getMilliseconds()}`.padStart(3, '0'),
  ].join('');

  return format ? result.substring(0, format.length) : result;

};

export default getBlockDate;
