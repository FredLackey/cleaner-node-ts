const { EMPTY_GUID } = require('../constants');
const isAlphanumeric = require('./is-alphanumeric');
const isValidChars = require('./is-valid-chars');
const isValidString = require('./is-valid-string');

const GUID_CHARS = '0123456789abcdef';

/**
 * Checks if a value conforms to the standard GUID format (e.g., 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx').
 * It validates the structure by splitting the string by hyphens and comparing the length and content
 * of each part against a template GUID.
 * 
 * @param {string} value - The string value to check.
 * @returns {boolean} True if the value is in a valid GUID format, false otherwise.
 */
const isGuidFormat = value => {
  if (!isValidString(value)) {
    console.debug('isGuidFormat: value is not a valid string');
    return false;
  }

  if (value.startsWith('{') && value.endsWith('}')) {
    value = value.slice(1, -1);
  }

  const emptyParts = EMPTY_GUID.split('-');
  const parts = value.split('-');
  if (emptyParts.length !== parts.length) { 
    console.debug(`isGuidFormat: value has ${parts.length} parts, expected ${emptyParts.length}`);
    return false; 
  }
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i].length !== emptyParts[i].length) { 
      console.debug(`isGuidFormat: part ${i} is not the correct length (${parts[i].length} actual)`);
      return false; 
    }
    if (!isValidChars(parts[i], GUID_CHARS)) { 
      console.debug(`isGuidFormat: part ${i} is not valid for GUID format: ${parts[i]}`);
      return false; 
    }
  }
  return true;
};

module.exports = isGuidFormat;
