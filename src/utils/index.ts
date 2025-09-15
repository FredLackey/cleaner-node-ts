import addDays from './add-days';
import addMinutes from './add-minutes';
import addMonths from './add-months';
import addYears from './add-years';
import ascending from './ascending';
import blockdate from './blockdate';
import cleanAlphanumeric from './clean-alphanumeric';
import cleanDigits from './clean-digits';
import cleanDto from './clean-dto';
import cleanObject from './clean-object';
import cleanString from './clean-string';
import copyContents from './copy-contents';
import copyFile from './copy-file';
import copyObject from './copy-object';
import comments from './comments';
import createPath from './create-path';
import deleteDirectory from './delete-directory';
import deleteFile from './delete-file';
import descending from './descending';
import decryptString from './decrypt-string';
import encryptString from './encrypt-string';
import env from './env';
import execution from './execution';
import express from './express';
import findAllUids from './find-all-uids';
import fromDto from './from-dto';
import fromEpoch from './from-epoch';
import fromIsoDate from './from-iso-date';
import fromResult from './from-result';
import fromShortDate from './from-short-date';
import getArrayCount from './get-array-count';
import getBlockDate from './get-blockdate';
import getBracket from './get-bracket';
import getCommonPath from './get-common-path';
import getDayName from './get-day-name';
import getDuration from './get-duration';
import getEmail from './get-email';
import getEmails from './get-emails';
import getEnum from './get-enum';
import getEnums from './get-enums';
import getFileContents from './get-file-contents';
import getFileName from './get-file-name';
import getFileSize from './get-file-size';
import getFiles from './get-files';
import getFirst from './get-first';
import getFolderContents from './get-folder-contents';
import getHash from './get-hash';
import getId from './get-id';
import getIds from './get-ids';
import getInnerTokens from './get-inner-tokens';
import getLast from './get-last';
import getMax from './get-max';
import getMin from './get-min';
import getPadPrefix from './get-pad-prefix';
import getPadSuffix from './get-pad-suffix';
import getPads from './get-pads';
import getSingle from './get-single';
import getStringSize from './get-string-size';
import getSubstring from './get-substring';
import getTokenizedSegments from './get-tokenized-segments';
import getUid from './get-uid';
import getUids from './get-uids';
import getVars from './get-vars';
import http from './http';
import hasString from './has-string';
import hashFile from './hash-file';
import hashFileContents from './hash-file-contents';
import hashLines from './hash-lines';
import hashObject from './hash-object';
import hashString from './hash-string';
import hash from './hash';
import initArray from './init-array';
import isAlpha from './is-alpha';
import isAlphanumeric from './is-alphanumeric';
import isAsync from './is-async';
import isBoolean from './is-boolean';
import isBooleanIfSet from './is-boolean-ifset';
import isBracketted from './is-bracketted';
import isCamelCase from './is-camel-case';
import isCaps from './is-caps';
import isDate from './is-date';
import isDefined from './is-defined';
import isDeleted from './is-deleted';
import isDigits from './is-digits';
import isEmail from './is-email';
import isEmptyArray from './is-empty-array';
import isEqualDate from './is-equal-date';
import isFile from './is-file';
import isFolder from './is-folder';
import isFunction from './is-function';
import isGuidFormat from './is-guid-format';
import isIpAddress from './is-ip-address';
import isIsoDate from './is-iso-date';
import isJsonArray from './is-json-array';
import isJsonObject from './is-json-object';
import isJson from './is-json';  
import isKebabCase from './is-kebab-case';
import isLowerCase from './is-lowercase';
import isMatch from './is-match';
import isNumber from './is-number';
import isObject from './is-object';
import isPascalCase from './is-pascal-case';
import isPhoneNumber from './is-phone-number';
import isSameDate from './is-same-date';
import isSet from './is-set';
import isSemver from './is-semver';
import isShortDate from './is-short-date';
import isSnakeCase from './is-snake-case';
import isUidFormat from './is-uid-format';
import isUrl from './is-url';
import isValidArray from './is-valid-array';
import isValidArrayIfSet from './is-valid-array-ifset';
import isValidChars from './is-valid-chars';
import isValidObject from './is-valid-object';
import isValidPath from './is-valid-path';
import isValidPathIfSet from './is-valid-path-ifset';
import isValidString from './is-valid-string';
import isValidStringIfSet from './is-valid-string-ifset';
import jwt from './jwt';
import loadJson from './load-json';
import isZeroDate from './is-zero-date';
import makePath from './make-path';
import maxDate from './max-date';
import minDate from './min-date';
import moveFile from './move-file';
import newCode from './new-code';
import newGuid from './new-guid';
import newSalt from './new-salt';
import newUid from './new-uid';
import nextjs from './nextjs';
import now from './now';
import parseJson from './parse-json';
import parseJwt from './parse-jwt';
import print from './print';
import readFile from './read-file';
import readLines from './read-lines';
import removeAuditFields from './remove-audit-fields';
import removeDeleted from './remove-deleted';
import removePrefix from './remove-prefix';
import removeProperty from './remove-property';
import removeSuffix from './remove-suffix';
import replaceValues from './replace-values';
import saveJson from './save-json';
import sort from './sort';
import splitFirst from './split-first';
import stringify from './stringify';
import toBoolean from './to-boolean';
import toCamelCase from './to-camel-case';
import toColumn from './to-column';
import toEpoch from './to-epoch';
import toGuidFormat from './to-guid-format';
import toKebabCase from './to-kebab-case';
import toPascalCase from './to-pascal-case';
import toResponse from './to-response';
import toRequest from './to-request';
import toResult from './to-result';
import toSnakeCase from './to-snake-case';
import toTable from './to-table';
import toUidFormat from './to-uid-format';
import trimArray from './trim-array';
import trimString from './trim-string';
import trimToNull from './trim-to-null';
import trimToUndefined from './trim-to-undefined';
import undouble from './undouble';
import unique from './unique';
import uniqueNumbers from './unique-numbers';
import uniqueObjects from './unique-objects';
import uniqueStrings from './unique-strings';
import unquote from './unquote';
import walk from './walk';
import writeFile from './write-file';
import writeLines from './write-lines';

// EXPERIMENTAL
import body from './get-body';

const { hasComments, removeComments } = comments;

export default {
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
  getBody: (req: any): any => {
    return isAsync(req) ? nextjs.getBody(req) : express.getBody(req);
  },
  body
};
