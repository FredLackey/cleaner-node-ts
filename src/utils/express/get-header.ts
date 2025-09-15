const getHeaders = require('./get-headers');

/**
 * Retrieves a specific header value from an Express request object, case-insensitively.
 * @param {Express.Request} request The Express request object.
 * @param {string} name The name of the header to retrieve.
 * @returns {string|undefined} The value of the specified header, or undefined if not found.
 */
const getHeader = (request, name) => {
  const headers = getHeaders(request);
  const key = Object.keys(headers).find(key => key.toLowerCase() === name.toLowerCase());
  return key ? headers[key] : undefined;
};

module.exports = getHeader;
