const addDays              = require('./add-days');
const addMinutes           = require('./add-minutes');
const addMonths            = require('./add-months');
const addYears             = require('./add-years');
const ascending            = require('./ascending');
const blockdate            = require('./blockdate');
const cleanAlphanumeric    = require('./clean-alphanumeric');
const cleanDigits          = require('./clean-digits');
const cleanDto             = require('./clean-dto');
const cleanObject          = require('./clean-object');
const cleanString          = require('./clean-string');
const copyContents         = require('./copy-contents');
const copyFile             = require('./copy-file');
const copyObject           = require('./copy-object');
const comments             = require('./comments');
const createPath           = require('./create-path');
const deleteDirectory      = require('./delete-directory');
const deleteFile           = require('./delete-file');
const descending           = require('./descending');
const decryptString        = require('./decrypt-string');
const encryptString        = require('./encrypt-string');
const env                  = require('./env');
const execution            = require('./execution');
const express              = require('./express');
const findAllUids          = require('./find-all-uids');
const fromDto              = require('./from-dto');
const fromEpoch            = require('./from-epoch');
const fromIsoDate          = require('./from-iso-date');
const fromResult           = require('./from-result');
const fromShortDate        = require('./from-short-date');
const getArrayCount        = require('./get-array-count');
const getBlockDate         = require('./get-blockdate');
const getBracket           = require('./get-bracket');
const getCommonPath        = require('./get-common-path');
const getDayName           = require('./get-day-name');
const getDuration          = require('./get-duration');
const getEmail             = require('./get-email');
const getEmails            = require('./get-emails');
const getEnum              = require('./get-enum');
const getEnums             = require('./get-enums');
const getFileContents      = require('./get-file-contents');
const getFileName          = require('./get-file-name');
const getFileSize          = require('./get-file-size');
const getFiles             = require('./get-files');
const getFirst             = require('./get-first');
const getFolderContents    = require('./get-folder-contents');
const getHash              = require('./get-hash');
const getId                = require('./get-id');
const getIds               = require('./get-ids');
const getInnerTokens       = require('./get-inner-tokens');
const getLast              = require('./get-last');
const getMax               = require('./get-max');
const getMin               = require('./get-min');
const getPadPrefix         = require('./get-pad-prefix');
const getPadSuffix         = require('./get-pad-suffix');
const getPads              = require('./get-pads');
const getSingle            = require('./get-single');
const getStringSize        = require('./get-string-size');
const getSubstring         = require('./get-substring');
const getTokenizedSegments = require('./get-tokenized-segments');
const getUid               = require('./get-uid');
const getUids              = require('./get-uids');
const getVars              = require('./get-vars');
const http                 = require('./http');
const hasString            = require('./has-string');
const hashFile             = require('./hash-file');
const hashFileContents     = require('./hash-file-contents');
const hashLines            = require('./hash-lines');
const hashObject           = require('./hash-object');
const hashString           = require('./hash-string');
const hash                 = require('./hash');
const initArray            = require('./init-array');
const isAlpha              = require('./is-alpha');
const isAlphanumeric       = require('./is-alphanumeric');
const isAsync              = require('./is-async');
const isBoolean            = require('./is-boolean');
const isBooleanIfSet       = require('./is-boolean-ifset');
const isBracketted         = require('./is-bracketted');
const isCamelCase          = require('./is-camel-case');
const isCaps               = require('./is-caps');
const isDate               = require('./is-date');
const isDefined            = require('./is-defined');
const isDeleted            = require('./is-deleted');
const isDigits             = require('./is-digits');
const isEmail              = require('./is-email');
const isEmptyArray         = require('./is-empty-array');
const isEqualDate          = require('./is-equal-date');
const isFile               = require('./is-file');
const isFolder             = require('./is-folder');
const isFunction           = require('./is-function');
const isGuidFormat         = require('./is-guid-format');
const isIpAddress          = require('./is-ip-address');
const isIsoDate            = require('./is-iso-date');
const isJsonArray          = require('./is-json-array');
const isJsonObject         = require('./is-json-object');
const isJson               = require('./is-json');  
const isKebabCase          = require('./is-kebab-case');
const isLowerCase          = require('./is-lowercase');
const isMatch              = require('./is-match');
const isNumber             = require('./is-number');
const isObject             = require('./is-object');
const isPascalCase         = require('./is-pascal-case');
const isPhoneNumber        = require('./is-phone-number');
const isSameDate           = require('./is-same-date');
const isSet                = require('./is-set');
const isSemver             = require('./is-semver');
const isShortDate          = require('./is-short-date');
const isSnakeCase          = require('./is-snake-case');
const isUidFormat          = require('./is-uid-format');
const isUrl                = require('./is-url');
const isValidArray         = require('./is-valid-array');
const isValidArrayIfSet    = require('./is-valid-array-ifset');
const isValidChars         = require('./is-valid-chars');
const isValidObject        = require('./is-valid-object');
const isValidPath          = require('./is-valid-path');
const isValidPathIfSet     = require('./is-valid-path-ifset');
const isValidString        = require('./is-valid-string');
const isValidStringIfSet   = require('./is-valid-string-ifset');
const jwt                  = require('./jwt');
const loadJson             = require('./load-json');
const isZeroDate           = require('./is-zero-date');
const makePath             = require('./make-path');
const maxDate              = require('./max-date');
const minDate              = require('./min-date');
const moveFile             = require('./move-file');
const newCode              = require('./new-code');
const newGuid              = require('./new-guid');
const newSalt              = require('./new-salt');
const newUid               = require('./new-uid');
const nextjs               = require('./nextjs');
const now                  = require('./now');
const parseJson            = require('./parse-json');
const parseJwt             = require('./parse-jwt');
const print                = require('./print');
const readFile             = require('./read-file');
const readLines            = require('./read-lines');
const removeAuditFields    = require('./remove-audit-fields');
const removeDeleted        = require('./remove-deleted');
const removePrefix         = require('./remove-prefix');
const removeProperty       = require('./remove-property');
const removeSuffix         = require('./remove-suffix');
const replaceValues        = require('./replace-values');
const saveJson             = require('./save-json');
const sort                 = require('./sort');
const splitFirst           = require('./split-first');
const stringify            = require('./stringify');
const toBoolean            = require('./to-boolean');
const toCamelCase          = require('./to-camel-case');
const toColumn             = require('./to-column');
const toEpoch              = require('./to-epoch');
const toGuidFormat         = require('./to-guid-format');
const toKebabCase          = require('./to-kebab-case');
const toPascalCase         = require('./to-pascal-case');
const toResponse           = require('./to-response');
const toRequest            = require('./to-request');
const toResult             = require('./to-result');
const toSnakeCase          = require('./to-snake-case');
const toTable              = require('./to-table');
const toUidFormat          = require('./to-uid-format');
const trimArray            = require('./trim-array').trim;
const trimString           = require('./trim-string');
const trimToNull           = require('./trim-to-null');
const trimToUndefined      = require('./trim-to-undefined');
const undouble             = require('./undouble');
const unique               = require('./unique');
const uniqueNumbers        = require('./unique-numbers');
const uniqueObjects        = require('./unique-objects');
const uniqueStrings        = require('./unique-strings');
const unquote              = require('./unquote');
const walk                 = require('./walk');
const writeFile            = require('./write-file');
const writeLines           = require('./write-lines');

// EXPERIMENTAL
const body                 = require('./get-body');

const { hasComments, removeComments } = comments;

module.exports = {
  ascending,
  addDays,
  addMinutes,
  addMonths,
  addYears,
  blockdate,
  cleanAlphanumeric,
  cleanDigits,
  cleanDto,
  cleanObject,
  cleanString,
  copyContents,
  copyFile,
  copyObject,
  comments,
  createPath,
  deleteDirectory,
  deleteFile,
  descending,
  decryptString,
  encryptString,
  env,
  execution,
  express,
  findAllUids,
  fromDto,
  fromEpoch,
  fromIsoDate,
  fromResult,
  fromShortDate,

  jwt,
  doGet   : http.doGet,
  doPost  : http.doPost,
  doPut   : http.doPut,
  doDelete: http.doDelete,
  getArrayCount,
  getBlockDate,
  getBracket,
  getCommonPath,
  getDayName,
  getDuration,
  getEmail,
  getEmails,
  getEnum,
  getEnums,
  getFileContents,
  getFileName,
  getFileSize,
  getFiles,
  getFirst,
  getFolderContents,
  getHash,
  getId,
  getIds,
  getInnerTokens,
  getLast,
  getPadPrefix,
  getPadSuffix,
  getPads,
  getMin,
  getMax,
  getSingle,
  getStringSize,
  getSubstring,
  getTokenizedSegments,
  getUid,
  getUids,
  getVars,
  hasComments,
  hasString,
  hashFile,
  hashFileContents,
  hashLines,
  hashObject,
  hashString,
  hash,
  ping: http.ping,
  initArray,
  isAlpha,
  isAlphanumeric,
  isAsync,
  isBoolean,
  isBooleanIfSet,
  isBracketted,
  isCamelCase,
  isCaps,
  isDate,
  isDefined,
  isDeleted,
  isDigits,
  isEmail,
  isEmptyArray,
  isEqualDate,
  isFile,
  isFolder,
  isFunction,
  isGuidFormat,
  isIpAddress,
  isIsoDate,
  isJsonArray,
  isJsonObject,
  isJson,
  isKebabCase,
  isLowerCase,
  isMatch,
  isNumber,
  isObject,
  isPascalCase,
  isPhoneNumber,
  isSameDate,
  isSet,
  isSemver,
  isShortDate,
  isSnakeCase,
  isUidFormat,
  isUrl,
  isValidArray,
  isValidArrayIfSet,
  isValidChars,
  isValidObject,
  isValidPath,
  isValidPathIfSet,
  isValidString,
  isValidStringIfSet,
  isZeroDate,
  loadJson,
  makePath,
  maxDate,
  minDate,
  moveFile,
  newCode,
  newGuid,
  newSalt,
  newUid,
  nextjs,
  now,
  parseJson,
  parseJwt,
  print,
  readFile,
  readLines,
  removeAuditFields,
  removeComments,
  removeDeleted,
  removePrefix,
  removeProperty,
  removeSuffix,
  replaceValues,
  saveJson,
  sort,
  splitFirst,
  stringify,
  toBoolean,
  toCamelCase,
  toColumn,
  toEpoch,
  toGuidFormat,
  toKebabCase,
  toPascalCase,
  toRequest,
  toResult,
  toResponse,
  toSnakeCase,
  toTable,
  toUidFormat,
  trimArray,
  trimString,
  trimToNull,
  trimToUndefined,
  undouble,
  unique,
  uniqueNumbers,
  uniqueObjects,
  uniqueStrings,
  unquote,
  walk,
  writeFile,
  writeLines,

    // CONVENIENCE
  isAlphaNumeric   : isAlphanumeric,
  cleanAlphaNumeric: cleanAlphanumeric,
  copy             : copyObject,
  first            : getFirst,
  last             : getLast,
  single           : getSingle,
  toReq            : toRequest,
  unQuote          : unquote,
  count            : getArrayCount,

  fromBlockDate: blockdate.fromBlockDate,
  isBlockDate  : blockdate.isBlockDate,
  isDirectory  : isFolder,

  execute       : execution.execute,
  executePromise: execution.executePromise,

  min: getMin,
  max: getMax,

  /**
   * Gets the body of a request, handling both Express and Next.js request objects.
   * Detects the request type based on whether it's an async function (assumed Next.js) or not (assumed Express).
   * @param {object} req The request object (either Express req or Next.js NextApiRequest).
   * @returns {*} The parsed body of the request.
   */
  getBody: (req) => {
    return isAsync(req) ? nextjs.getBody(req) : express.getBody(req);
  },
  body
};
