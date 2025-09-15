/**
 * Finds the latest date from an array of Date objects.
 *
 * @param {Date[]} dates - An array of Date objects.
 * @returns {Date|null} The latest Date object from the array, or null if the input is not a non-empty array.
 */
const maxDate = (dates) => {
  if (Array.isArray(dates) && dates.length > 0) {
    // Sort the array of dates in descending order
    dates.sort((a, b) => b - a);
    return dates[0]; // The first element is the latest date
  }
  return null; // Return null if the array is empty or not an array
};

module.exports = maxDate;
