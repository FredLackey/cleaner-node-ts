const { INTERNAL_SERVER_ERROR } = require('./constants').HTTP.STATUS.CODES;
const _ = require('./utils');

/**
 * Custom error class for API errors.
 * @extends Error
 */
class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {object} options - The error options.
   * @param {number} [options.status=500] - The HTTP status code.
   * @param {string|number|null} [options.number=null] - An optional error number or code.
   * @param {string} [options.message=''] - The error message.
   * @param {string|object} [options.details=''] - Additional error details.
   */
  constructor ({ status, number, message, details }) {
    super(message);
    this.status   = status || INTERNAL_SERVER_ERROR;
    this.number   = number || null;
    this.details  = details || '';
    this.name     = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Initializes a new ApiError instance.
 * @param {number} [status=''] - The HTTP status code. Defaults to INTERNAL_SERVER_ERROR if empty.
 * @param {string|number} [number=''] - An optional error number or code. Defaults to null if empty.
 * @param {string} [message=''] - The error message.
 * @param {string|object} [details=''] - Additional error details.
 * @returns {ApiError} A new ApiError instance.
 */
const init = (status = '', number = '', message = '', details = '') => {
  return new ApiError({ status, number, message, details });
};

/**
 * Creates a new ApiError instance with a specific status code.
 * @param {number} value - The HTTP status code.
 * @param {object} [params={}] - Optional parameters.
 * @param {string|number} [params.number] - An optional error number or code.
 * @param {string} [params.message] - The error message.
 * @param {string|object} [params.details] - Additional error details.
 * @returns {ApiError} A new ApiError instance.
 */
const status = (value, params = {}) => {
  const { number, message, details } = params;
  return new ApiError({ status: value, number, message, details });
};

/**
 * Creates a new ApiError instance with a specific error number.
 * @param {string|number} value - The error number or code.
 * @param {object} [params={}] - Optional parameters.
 * @param {number} [params.status] - The HTTP status code.
 * @param {string} [params.message] - The error message.
 * @param {string|object} [params.details] - Additional error details.
 * @returns {ApiError} A new ApiError instance.
 */
const number = (value, params = {}) => {
  const { status, message, details } = params;
  return new ApiError({ status, number: value, message, details });
};

/**
 * Creates a new ApiError instance with a specific message.
 * @param {string} value - The error message.
 * @param {object} [params={}] - Optional parameters.
 * @param {number} [params.status] - The HTTP status code.
 * @param {string|number} [params.number] - An optional error number or code.
 * @param {string|object} [params.details] - Additional error details.
 * @returns {ApiError} A new ApiError instance.
 */
const message = (value, params = {}) => {
  const { status, number, details } = params;
  return new ApiError({ status, number, message: value, details });
};

/**
 * Creates a new ApiError instance with specific details.
 * @param {string|object} value - The error details.
 * @param {object} [params={}] - Optional parameters.
 * @param {number} [params.status] - The HTTP status code.
 * @param {string|number} [params.number] - An optional error number or code.
 * @param {string} [params.message] - The error message.
 * @returns {ApiError} A new ApiError instance.
 */
const details = (value, params = {}) => {
  const { message, number, status } = params;
  return new ApiError({ status, number, message, details: value });
};

/**
 * Checks if a value is an Error object.
 * @param {*} value - The value to check.
 * @param {boolean} [strict=false] - If true, checks if the value is strictly an instance of Error. If false, checks for common error properties (stack, message).
 * @returns {boolean} True if the value is considered an error, false otherwise.
 */
const isError = (value, strict = false) => {
  return (strict === true)
    ? (value && value instanceof Error)
    : (value && value.stack && value.message);
};

/**
 * Checks if a status code represents success (2xx).
 * @param {*} value - The value containing the status code (e.g., an error object or a number).
 * @param {boolean} [strict=true] - If true, checks specifically for status code 200. If false, checks for any status code between 200 and 299 (inclusive).
 * @returns {boolean} True if the status code is considered OK, false otherwise.
 */
const isOK = (value, strict = true) => {
  if (!value || !_.isNumber(value.status)) {
    return false;
  }
  value = Number(value);
  return (strict === true)
    ? value === 200
    : value >= 200 && value <= 299;
};

/**
 * Checks if a status code represents success (2xx) non-strictly.
 * Shorthand for `isOK(value, false)`.
 * @param {*} value - The value containing the status code.
 * @returns {boolean} True if the status code is between 200 and 299 (inclusive), false otherwise.
 */
const isOKish = value => isOK(value, false);

module.exports = {
  ApiError,

  init,
  message,
  number,
  status,
  details,

  isError,
  isOK,
  isOKish
};
