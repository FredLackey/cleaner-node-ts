const isValidString = require('../is-valid-string');
const isObject      = require('../is-object');
const isDefined     = require('../is-defined');
const getHeader     = require('./get-header');
const getHeaders    = require('./get-headers');
const getSingle     = require('../get-single');
const getFirst      = require('../get-first');
const getUrlParam   = require('./get-url-param');
const getUrlParams  = require('./get-url-params');
const middleware    = require('./middleware');
const respond       = require('./respond');

const HTTP_PORT = 80;
const HTTPS_PORT = 443;

const asyncMiddleware = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const getKeys = (obj, keyOrKeys, isCaseSensitive = false) => {
  if (!isObject(obj)) { return []; }
  const targetKeys = [].concat(keyOrKeys)
    .filter(key => (isValidString(key)))
    .map(key => (isCaseSensitive ? key : key.toLowerCase()));
  return Object.keys(obj).filter(key => (key && 
    ((isCaseSensitive && targetKeys.includes(key)) ||
    (!isCaseSensitive && targetKeys.includes(key.toLowerCase())))));
};
const getValuesFromObject = (obj, keyOrKeys, isCaseSensitive = false) => (
  getKeys(obj, keyOrKeys, isCaseSensitive)
    .filter(key => (isValidString(key)))
    .map(key => (obj[key]))
);

// MULTIPLES
const getValuesFromBody = (req, keyOrKeys, isCaseSensitive = false) => getValuesFromObject(req.body, keyOrKeys, isCaseSensitive);
const getValuesFromParams = (req, keyOrKeys, isCaseSensitive = false) => getValuesFromObject(req.params, keyOrKeys, isCaseSensitive);
const getValuesFromQuery = (req, keyOrKeys, isCaseSensitive = false) => getValuesFromObject(req.query, keyOrKeys, isCaseSensitive);
const getValuesFromHeaders = (req, keyOrKeys, isCaseSensitive = false) => getValuesFromObject(req.headers, keyOrKeys, isCaseSensitive);
const getValuesFromCookies = (req, keyOrKeys, isCaseSensitive = false) => getValuesFromObject(req.cookies, keyOrKeys, isCaseSensitive);
const getValues = (req, keyOrKeys, isCaseSensitive = false) => ([
  ...getValuesFromBody(req, keyOrKeys, isCaseSensitive),
  ...getValuesFromParams(req, keyOrKeys, isCaseSensitive),
  ...getValuesFromQuery(req, keyOrKeys, isCaseSensitive),
  ...getValuesFromHeaders(req, keyOrKeys, isCaseSensitive),
  ...getValuesFromCookies(req, keyOrKeys, isCaseSensitive),
].filter(x => (isDefined(x))));

// SINGULAR
const singleValueFromBody = (req, keyOrKeys, isCaseSensitive = false) => getSingle(getValuesFromBody(req, keyOrKeys, isCaseSensitive));
const singleValueFromParams = (req, keyOrKeys, isCaseSensitive = false) => getSingle(getValuesFromParams(req, keyOrKeys, isCaseSensitive));
const singleValueFromQuery = (req, keyOrKeys, isCaseSensitive = false) => getSingle(getValuesFromQuery(req, keyOrKeys, isCaseSensitive));
const singleValueFromHeaders = (req, keyOrKeys, isCaseSensitive = false) => getSingle(getValuesFromHeaders(req, keyOrKeys, isCaseSensitive));
const singleValueFromCookies = (req, keyOrKeys, isCaseSensitive = false) => getSingle(getValuesFromQuery(req, keyOrKeys, isCaseSensitive));
const singleValue = (req, keyOrKeys, isCaseSensitive = false) => getSingle(getValues(req, keyOrKeys, isCaseSensitive));

// FIRST
const firstValueFromBody = (req, keyOrKeys, isCaseSensitive = false) => getFirst(getValuesFromBody(req, keyOrKeys, isCaseSensitive));
const firstValueFromParams = (req, keyOrKeys, isCaseSensitive = false) => getFirst(getValuesFromParams(req, keyOrKeys, isCaseSensitive));
const firstValueFromQuery = (req, keyOrKeys, isCaseSensitive = false) => getFirst(getValuesFromQuery(req, keyOrKeys, isCaseSensitive));
const firstValueFromHeaders = (req, keyOrKeys, isCaseSensitive = false) => getFirst(getValuesFromHeaders(req, keyOrKeys, isCaseSensitive));
const firstValueFromCookies = (req, keyOrKeys, isCaseSensitive = false) => getFirst(getValuesFromQuery(req, keyOrKeys, isCaseSensitive));
const firstValue = (req, keyOrKeys, isCaseSensitive = false) => getFirst(getValues(req, keyOrKeys, isCaseSensitive));

const getJwt = ({ req, key = 'jwt', keys = [], header = 'authorization', headers = [], cookie = 'token', cookies = [] }) => {
  
  if (!req) { 
    return null;
  }

  keys    = [key, ...[].concat(keys)].filter(isValidString);
  headers = [header, ...[].concat(headers)].filter(isValidString);
  cookies = [cookie, ...[].concat(cookies)].filter(isValidString);

  let result;

  result = result || firstValueFromQuery(req, keys, false);
  result = result || firstValueFromHeaders(req, headers, false);
  result = result || firstValueFromCookies(req, cookies, false);

  return result;
};

const getUrl = (req) => {

  const protocol = req.protocol.trim().toLowerCase();
  const host = req.hostname.trim().toLowerCase();
  const url = req.originalUrl;
  
  const port = process.env.PORT || process.env.NODE_PORT || (protocol === 'https' 
    ? HTTPS_PORT 
    : HTTP_PORT);

  const hostSuffix = (protocol === 'HTTPS' && port === HTTPS_PORT) || (protocol === 'http' && port === HTTP_PORT) 
    ? '' 
    : `:${port}`;

  return `${protocol}://${host}${hostSuffix}${url}`;

};

const getClientIp = req => {
  if (!req) { return null; }
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
};

const getBody = (req) => {
  if (!req) { return null; }
  return req.body;
};

module.exports = {

  middleware,

  asyncMiddleware,
  amw   : asyncMiddleware,
  wrap  : asyncMiddleware,

  getBody,

  getKeys,
  getValuesFromObject,

  getValues,
  getValuesFromBody,
  getValuesFromParams,
  getValuesFromQuery,
  getValuesFromHeaders,
  getValuesFromCookies,

  getValue: firstValue,
  getValueFromBody: firstValueFromBody,
  getValueFromParams: firstValueFromParams,
  getValueFromQuery: firstValueFromQuery,
  getValueFromHeaders: firstValueFromHeaders,
  getValueFromCookies: firstValueFromCookies,

  singleValue,
  singleValueFromBody,
  singleValueFromParams,
  singleValueFromQuery,
  singleValueFromHeaders,
  singleValueFromCookies,

  firstValue,
  firstValueFromBody,
  firstValueFromParams,
  firstValueFromQuery,
  firstValueFromHeaders,
  firstValueFromCookies,

  getHeader,
  getHeaders,
  getJwt,
  getUrl,
  getUrlParam,
  getUrlParams,
  fullUrl: getUrl,
  getClientIp,
  respond
};
