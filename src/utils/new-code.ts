const crypto = require('crypto');
const c      = require('../constants');

/**
 * Generates a random code string of a specified length using a given set of characters.
 *
 * @param {number} [totalLength=c.DEFAULTS.CODE.LENGTH] - The desired length of the code. Defaults to the value defined in `c.DEFAULTS.CODE.LENGTH`.
 * @param {string} [chars=c.DEFAULTS.CODE.CHARS] - The string of characters to use for generating the code. Defaults to the value defined in `c.DEFAULTS.CODE.CHARS`.
 * @returns {string} The generated random code string.
 */
const newCode = (totalLength = c.DEFAULTS.CODE.LENGTH, chars = c.DEFAULTS.CODE.CHARS) => {

  const _length = Number(totalLength);

  const rnd   = crypto.randomBytes(_length);
  const value = new Array(_length);
  const len   = chars.length;

  for (let i = 0; i < _length; i += 1) {
    value[i] = chars[rnd[i] % len];
  }

  return value.join('');
};

module.exports = newCode;
