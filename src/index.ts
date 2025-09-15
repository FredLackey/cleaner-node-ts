const constants = require('./constants');
const errors    = require('./errors');
const utils     = require('./utils');

utils.errors = errors;
utils.status = constants.HTTP.STATUS.CODES;

utils.a = utils.initArray;

utils.ALPHA        = constants.ALPHA;
utils.ALPHANUMERIC = constants.ALPHANUMERIC;
utils.BRACKETS     = constants.BRACKETS;
utils.CLEAR_CODE   = constants.CLEAR_CODE;
utils.DIGITS       = constants.DIGITS;
utils.ENUM_NAME    = constants.ENUM_NAME;
utils.EMPTY_GUID   = constants.EMPTY_GUID;
utils.EMPTY_UID    = constants.EMPTY_UID;
utils.HTTP         = constants.HTTP;
utils.TYPES        = constants.TYPES;
utils.DEFAULTS     = constants.DEFAULTS;
utils.ZERO_DATE    = constants.ZERO_DATE;


module.exports = utils;
