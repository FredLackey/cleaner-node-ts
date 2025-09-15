/**
 * Converts a Date object to its Unix epoch timestamp (seconds since Jan 1, 1970).
 *
 * @param {Date} [date=new Date()] - The Date object to convert. Defaults to the current date and time.
 * @returns {number} The Unix epoch timestamp in seconds.
 */
const toEpoch = (date = new Date()) => {
  const seconds = Math.floor(date.getTime() / 1000);
  return seconds;
};

module.exports = toEpoch;
