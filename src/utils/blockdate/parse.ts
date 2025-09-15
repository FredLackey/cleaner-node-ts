const isDigits = require('../is-digits');

const MAX_YEAR = (new Date()).getFullYear();

const YYYYMMDD = {
  length: 'YYYYMMDD'.length,
  fields: [
    'year',
    'month',
    'day'
  ]
};
const YYYYMMDDHHmm = {
  length: 'YYYYMMDDHHmm'.length,
  fields: [
    'year',
    'month',
    'day',
    'hour',
    'minute'
  ]
};
const YYYYMMDDHHmmss = {
  length: 'YYYYMMDDHHmmss'.length,
  fields: [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second'
  ]
};
const YYYYMMDDHHmmssSSS = {
  length: 'YYYYMMDDHHmmssSSS'.length,
  fields: [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond'
  ]
};
const FORMATS = [
  YYYYMMDD,
  YYYYMMDDHHmm,
  YYYYMMDDHHmmss,
  YYYYMMDDHHmmssSSS
];

/**
 * Parses a blockdate string (YYYYMMDD, YYYYMMDDHHmm, YYYYMMDDHHmmss, or YYYYMMDDHHmmssSSS) into its components.
 * @param {string} value The blockdate string to parse.
 * @param {number} [maxYear=current year] The maximum allowed year.
 * @returns {object|null} An object containing the parsed date components (year, month, day, hour, minute, second, millisecond) with raw and validated values, or null if the input is invalid.
 */
const parse = (value, maxYear = MAX_YEAR) => {
  
  if (!isDigits(value)) {
    return null;
  }
  
  const format = FORMATS.find(format => format.length === value.length);
  if (!format) {
    return null;
  }
  if (`${Number(value)}` !== `${value}`) {
    return null;
  }

  const result = {
    year: {
      raw: (value.length > 4) ? Number(value.substring(0, 4)) : -1,
      value: -1,
      validator: (value) => {
        return (Number(value) >= 1700 && Number(value) <= maxYear);
      }
    },
    month: {
      raw: (value.length > 6) ? Number(value.substring(4, 6)) - 1 : -1,
      value: -1,
      validator: (value) => {
        return (Number(value) >= 0 && Number(value) <= 11);
      }
    },
    day: {
      raw: (value.length >= 8) ? Number(value.substring(6, 8)) : -1,
      value: -1,
      validator: (value) => {
        return (Number(value) >= 1 && Number(value) <= 31);
      }
    },
    hour: {
      raw: (value.length >= 10) ? Number(value.substring(8, 10)) : -1,
      value: -1,
      validator: (value) => {
        return (Number(value) >= 0 && Number(value) <= 24);
      }
    },
    minute: {
      raw: (value.length >= 12) ? Number(value.substring(10, 12)) : -1,
      value: -1,
      validator: (value) => {
        return (Number(value) >= 0 && Number(value) <= 59);
      }
    },
    second: {
      raw: (value.length >= 14) ? Number(value.substring(12, 14)) : -1,
      value: -1,
      validator: (value) => {
        return (Number(value) >= 0 && Number(value) <= 59);
      }
    },
    millisecond: {
      raw: (value.length >= 17) ? Number(value.substring(14)) : -1,
      value: -1,
      validator: (value) => {
        return (Number(value) >= 0 && Number(value) <= 999);
      }
    }
  };
  Object.keys(result).forEach(key => {
    const { raw } = result[key];
    result[key].value = result[key].validator(raw) ? raw : -1;
  });
  const invalidFields = format.fields.filter(field => result[field].value < 0);
  if (invalidFields.length > 0) { 
    return null;
  }

  return result;
};

module.exports = parse;
