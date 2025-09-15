import * as constants from './constants';
import * as errors from './errors';
import utils from './utils';

const cleanerNode = {
  ...utils,
  errors,
  status: constants.HTTP.STATUS.CODES,
  a: utils.initArray,
  ALPHA: constants.ALPHA,
  ALPHANUMERIC: constants.ALPHANUMERIC,
  BRACKETS: constants.BRACKETS,
  CLEAR_CODE: constants.CLEAR_CODE,
  DIGITS: constants.DIGITS,
  ENUM_NAME: constants.ENUM_NAME,
  EMPTY_GUID: constants.EMPTY_GUID,
  EMPTY_UID: constants.EMPTY_UID,
  HTTP: constants.HTTP,
  TYPES: constants.TYPES,
  DEFAULTS: constants.DEFAULTS,
  ZERO_DATE: constants.ZERO_DATE,
};

export default cleanerNode;
