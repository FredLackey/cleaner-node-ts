const isDigits = require('../is-digits');
const isObject = require('../is-object');
const isNumber = require('../is-number');
const isValidArray = require('../is-valid-array');
const trimToUndefined = require('../trim-to-undefined');

const DEFAULT_STATUS = 200;
const DEFAULT_CODE = -1;
const EMPTY_OK = true;

/**
 * Sends a standardized JSON response using an Express response object.
 * Automatically formats the response based on the data type (object, array, or message).
 * Includes an optional custom status code within the JSON payload.
 * @param {Express.Response} res The Express response object.
 * @param {object|array|string|*} data The data to send in the response. If an object or array, it's nested under a 'data' key. Otherwise, it's treated as a message under a 'message' key.
 * @param {number} [httpStatusCode=200] The HTTP status code for the response.
 * @param {number} [statusCode=-1] An optional custom status code to include within the JSON response body under the 'status' key. Defaults to undefined if not provided or set to -1.
 * @returns {Express.Response} The Express response object, after sending the response.
 */
const respond = (res, data, httpStatusCode = DEFAULT_STATUS, statusCode = DEFAULT_CODE) => {

  const status = (isNumber(statusCode) || isDigits(statusCode)) && Number(statusCode) !== DEFAULT_CODE
    ? Number(statusCode)
    : undefined;

  const response = isObject(data)
    ? { data, status }
    : isValidArray(data, EMPTY_OK)
      ? { data, status }
      : { message: trimToUndefined(data), status };

  const httpStatus = (isNumber(httpStatusCode) || isDigits(httpStatusCode))
    ? Number(httpStatusCode)
    : DEFAULT_STATUS;

  return res.status(httpStatus).json(response);
};

module.exports = respond;
