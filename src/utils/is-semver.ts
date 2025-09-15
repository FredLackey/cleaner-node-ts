const isValidString = require('./is-valid-string');
// const isDigits = require('./is-digits');
const semver = require('semver');

// const isSemver = value => {
//   if (!isValidString(value) || value.length < 5) {
//     return false;
//   }
//   if (value.startsWith('v')) {
//     value = value.slice(1);
//   }
//   const clean = value.split('.').filter(x => isDigits(x)).join('.');
//   if (value !== clean) {
//     return false;
//   }
//   return true;
// }

/**
 * Checks if a string is a valid Semantic Versioning (SemVer) string.
 * Uses the `semver` library for validation.
 *
 * @param {string} value - The string to check.
 * @returns {boolean} True if the value is a valid SemVer string, false otherwise.
 */
const isSemver = value => {
  return isValidString(value) && semver.valid(value) !== null;
};

module.exports = isSemver;
