/**
 * Finds the earliest date from an array of Date objects.
 *
 * @param {Date[]} dates - An array of Date objects.
 * @returns {Date|null} The earliest Date object from the array, or null if the input is not a non-empty array.
 */
const minDate = (dates) => {
  if (Array.isArray(dates) && dates.length > 0) {
    // Sort the array of dates in ascending order
    dates.sort((a, b) => a - b);
    return dates[0]; // The first element is the earliest date
  }
  return null; // Return null if the array is empty or not an array
};

module.exports = minDate;
