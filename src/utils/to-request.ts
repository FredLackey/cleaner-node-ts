const copyObject = require('./copy-object');
const isDigits   = require('./is-digits');
const isObject   = require('./is-object');

/**
 * Transforms a raw request object (presumably from an HTTP request) into a standardized request format.
 * Extracts path, request metadata (ID, date), token, session information, and the request body.
 * Removes internal properties like `_headers` and `_path` from the copied body.
 *
 * @param {object} req - The raw request object.
 * @param {object} req._headers - The headers object within the request.
 * @param {string} req._path - The path associated with the request.
 * @returns {object|undefined} A standardized request object or undefined if the input is not a valid object.
 * @returns {string} return.path - The request path.
 * @returns {object} return.request - Request metadata.
 * @returns {string} return.request.id - The request ID extracted from headers.
 * @returns {Date|undefined} return.request.date - The request date extracted and parsed from headers.
 * @returns {string|undefined} return.token - The authorization token (Bearer prefix removed).
 * @returns {object|undefined} return.session - The session object, potentially transformed.
 * @returns {object} return.body - A copy of the request body with internal properties removed.
 */
const toRequest = (req) => {
  
  if (!isObject(req)) {
    return undefined;
  }

  const head = req._headers || {};

  const token   = head['RestUtils-Token'];
  const session = head['RestUtils-Session'];

  const time = head['RestUtils-Time'];
  const date = isDigits(time) ? new Date(time) : undefined;

  const body = copyObject(req);
  if (body._headers) {
    Reflect.deleteProperty(body, '_headers');
  }
  if (body._path) {
    Reflect.deleteProperty(body, '_path');
  }


  return {
    path: req._path,
    request: {
      id: head['RestUtils-Request'],
      date,
    },
    token  : (token && token.startsWith('Bearer ') ? token.substring(7) : token),
    session : (session && session.session) 
      ? {
          ...session,
          id: session.session,
          session: undefined
        }
      : undefined,
    body
  };
};

module.exports = toRequest;
