/**
 * Checks if a value is defined (i.e., not `undefined`).
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is not undefined, false otherwise.
 */
const isDefined = value => (typeof value !== 'undefined');

module.exports = isDefined;
