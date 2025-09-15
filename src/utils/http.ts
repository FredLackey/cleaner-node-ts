const removePrefix  = require('./remove-prefix');
const removeSuffix  = require('./remove-suffix');
const isValidString = require('./is-valid-string');
const isObject      = require('./is-object');
const isValidObject = require('./is-valid-object');

const IS_EMPTY_STRING_OKAY = true;
const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

/**
 * Removes the Content-Type header if its value is not a valid, non-empty string.
 * Modifies the headers object in place.
 * @param {object} headers The headers object.
 */
const removeBlankContentType = headers => {
  const keys = Object.keys(headers);
  const key = keys.find(key => key.toLowerCase() === 'content-type');
  if (!key) {
    return;
  }
  if (!isValidString(headers[key])) {
    delete headers[key];
  }
};

/**
 * Converts a value into a full URL string, ensuring it starts with http:// or https://.
 * Removes leading/trailing slashes before prefixing with http:// if necessary.
 * @param {string} [value='/'] The value to convert to a URL. Defaults to '/'.
 * @returns {string} The formatted URL string.
 */
const toUrl = (value = '/') => {

  let url = value;
      url = removePrefix(url, '/');
      url = removeSuffix(url, '/');

  return url.toLowerCase().startsWith('http')
    ? url
    : `http://${url}`;
};

/**
 * Converts a value to a string suitable for an HTTP request body.
 * Stringifies objects, passes through strings, returns undefined otherwise.
 * @param {*} value The value to convert.
 * @returns {string|undefined} The stringified body or undefined.
 */
const toBody = (value) => {
  if (isObject(value)) {
    return JSON.stringify(value);
  }
  if (isValidString(value)) {
    return value;
  }
  return undefined;
};

/**
 * Merges default headers, provided headers, and adds Authorization headers based on credentials.
 * Ensures Content-Type is set if not provided or blank.
 * @param {object} [creds={}] Credentials object which may contain user, pass/password, or token.
 * @param {object} [headers={}] Additional headers to include.
 * @returns {object} The combined headers object.
 */
const addHeaders = (creds = {}, headers = {}) => {

  const { user, pass, password, token } = creds;

  const result = isValidObject(headers) ? headers : DEFAULT_HEADERS;
  removeBlankContentType(result);
  
  if (Object.keys(result).some(key => key.toLowerCase() === 'content-type') && !result['Content-Type']) {
    result['Content-Type'] = 'application/json';
  }
  if (user || pass || password) {
    result.Authorization = `Basic ${Buffer.from(`${user}:${pass || password}`).toString('base64')}`;
  }
  if (token) {
    result.Authorization = `Bearer ${token}`;
  }

  Object.keys(headers)
    .filter(key => (key && isValidString(headers[key], IS_EMPTY_STRING_OKAY)))
    .forEach(key => {
      result[key] = headers[key];
    });
  
  return result;
};

/**
 * Performs a fetch request with the specified options.
 * Handles URL formatting, body conversion, and header generation.
 * @param {object} options The options for the fetch request.
 * @param {string} [options.method='GET'] The HTTP method.
 * @param {string} options.url The target URL.
 * @param {*} [options.data] The request body data.
 * @param {object} [options.creds={}] Credentials for Authorization header.
 * @param {object} [options.headers={}] Additional request headers.
 * @returns {Promise<*>} A promise that resolves with the JSON response, or logs an error on failure.
 */
const doPromise = ({ method = 'GET', url, data, creds = {}, headers = {} }) => {
  return fetch(toUrl(url), {
    // credentials: 'same-origin', // 'include', default: 'omit'
    method,
    body   : toBody(data),
    headers: addHeaders(creds, headers),
  })
  .then(response => response.json())
  .catch(error => console.debug(error));
};


/**
 * Performs a GET request.
 * @param {string} url The target URL.
 * @param {object} [creds={}] Credentials for Authorization header.
 * @param {object} [headers={}] Additional request headers.
 * @returns {Promise<*|null>} A promise that resolves with the JSON response, or null on error.
 */
const doGet = async (url, creds = {}, headers = {}) => {
  try {
    const response = await doPromise({ url, creds, headers });
    return response;
  } catch (ex) {
    console.debug(`doGet Error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

/**
 * Performs a POST request.
 * @param {string} url The target URL.
 * @param {*} data The request body data.
 * @param {object} [creds={}] Credentials for Authorization header.
 * @param {object} [headers={}] Additional request headers.
 * @returns {Promise<*|null>} A promise that resolves with the JSON response, or null on error.
 */
const doPost = async (url, data, creds = {}, headers = {}) => {
  try {
    const response = await doPromise({ method: 'POST', url, data, creds, headers });
    return response;
  } catch (ex) {
    console.debug(`doPost Error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

/**
 * Performs a PUT request.
 * @param {string} url The target URL.
 * @param {*} data The request body data.
 * @param {object} [creds={}] Credentials for Authorization header.
 * @param {object} [headers={}] Additional request headers.
 * @returns {Promise<*|null>} A promise that resolves with the JSON response, or null on error.
 */
const doPut = async (url, data, creds = {}, headers = {}) => {
  try {
    const response = await doPromise({ method: 'PUT', url, data, creds, headers });
    return response;
  } catch (ex) {
    console.debug(`doPut Error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

/**
 * Performs a DELETE request.
 * @param {string} url The target URL.
 * @param {*} [data] Optional request body data.
 * @param {object} [creds={}] Credentials for Authorization header.
 * @param {object} [headers={}] Additional request headers.
 * @returns {Promise<*|null>} A promise that resolves with the JSON response, or null on error.
 */
const doDelete = async (url, data, creds = {}, headers = {}) => {
  try {
    const response = await doPromise({ method: 'DELETE', url, data, creds, headers });
    return response;
  } catch (ex) {
    console.debug(`doDelete Error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

/**
 * Performs a GET request to the root path ('/') to check connectivity.
 * @param {object} [creds={}] Credentials for Authorization header.
 * @param {object} [headers={}] Additional request headers.
 * @returns {Promise<*|string>} A promise that resolves with the response or 'FAILURE'.
 */
const ping = async (creds = {}, headers = {}) => {
  const response = await doGet('/', creds, headers);
  return response || 'FAILURE';
};

module.exports = {
  ping,

  doGet,
  doPost,
  doPut,
  doDelete
};
