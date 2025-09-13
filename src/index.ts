/**
 * cleaner-node-ts - TypeScript-first utility library for Node.js
 *
 * Import as: import _ from 'cleaner-node-ts';
 * Usage: _.isValidString(value), _.cleanObject(obj), etc.
 */

// Import all constants
import * as constants from './constants';

// Import all validation functions
import * as validation from './validation';

// Import all string functions
import * as stringFunctions from './string';

// Import all array functions
import * as arrayFunctions from './array';

// Import all object functions
import * as objectFunctions from './object';

// Import all utility functions
import * as utils from './utils';

// Import all file functions
import * as fileFunctions from './file';

// Import all date functions
import * as dateFunctions from './date';

// Import all crypto functions
import * as cryptoFunctions from './crypto';

// Import all HTTP functions
import * as httpFunctions from './http';

// Import all environment functions
import * as envFunctions from './env';

// Re-export types
export * from './types';

/**
 * Main export object containing all utility functions
 */
const cleanerNode = {
  // Constants
  ...constants,

  // Validation functions
  ...validation,

  // String functions
  ...stringFunctions,

  // Array functions
  ...arrayFunctions,

  // Object functions
  ...objectFunctions,

  // Utility functions
  ...utils,

  // File functions
  ...fileFunctions,

  // Date functions
  ...dateFunctions,

  // Crypto functions
  ...cryptoFunctions,

  // HTTP functions
  ...httpFunctions,

  // Environment functions
  ...envFunctions,
};

// Default export for underscore pattern
export default cleanerNode;

// Named export for specific imports
export const _ = cleanerNode;
