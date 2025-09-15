import isDate from './is-date';
import isIsoDate from './is-iso-date';
import fromIso from './from-iso-date';

/**
 * Gets the full name of the day of the week (e.g., 'Sunday', 'Monday') for a given Date object or ISO date string.
 * @param {Date|string} date The Date object or ISO 8601 date string.
 * @returns {string|undefined} The full name of the day, or undefined if the input is invalid.
 */
const getDayName = (date: Date | string): string | undefined => {

  if (!isDate(date) && !isIsoDate(date)) {
    return undefined;
  }

  let dateObj: Date;
  if (isIsoDate(date)) {
    const convertedDate = fromIso(date as string);
    if (!convertedDate) {
      return undefined;
    }
    dateObj = convertedDate;
  } else {
    dateObj = date as Date;
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayIndex = dateObj.getDay();
  return daysOfWeek[dayIndex];
};

export default getDayName;
