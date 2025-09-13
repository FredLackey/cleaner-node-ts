/**
 * Constants used throughout the library
 */

/**
 * Character sets for string cleaning and validation
 */
export const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const ALPHA_LOWER = 'abcdefghijklmnopqrstuvwxyz';
export const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const DIGITS = '0123456789';
export const HEX_LOWER = '0123456789abcdef';
export const HEX_UPPER = '0123456789ABCDEF';
export const HEX = '0123456789ABCDEFabcdef';

/**
 * Regular expressions for validation
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const URL_REGEX = /^https?:\/\/.+/;
export const GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const UID_REGEX = /^[A-Z0-9]{32}$/;
export const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
export const SHORT_DATE_REGEX = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
export const BLOCK_DATE_REGEX = /^\d{17}$/;
export const PHONE_REGEX = /^[\d\s()+-]+$/;
export const IP_REGEX = /^(\d{1,3}\.){3}\d{1,3}$/;

/**
 * Case format regular expressions
 */
export const CAMEL_CASE_REGEX = /^[a-z][a-zA-Z0-9]*$/;
export const PASCAL_CASE_REGEX = /^[A-Z][a-zA-Z0-9]*$/;
export const SNAKE_CASE_REGEX = /^[a-z][a-z0-9_]*$/;
export const KEBAB_CASE_REGEX = /^[a-z][a-z0-9-]*$/;

/**
 * Bracket pairs for tokenization
 */
export const BRACKET_PAIRS: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
  '"': '"',
  "'": "'",
  '`': '`',
};

/**
 * Default values
 */
export const DEFAULT_ENCODING: BufferEncoding = 'utf8';
export const DEFAULT_HASH_ALGORITHM = 'md5';
export const DEFAULT_HASH_ENCODING = 'hex';
export const DEFAULT_SALT_LENGTH = 32;
export const DEFAULT_CODE_LENGTH = 8;
export const DEFAULT_TIMEOUT = 30000; // 30 seconds

/**
 * Date constants
 */
export const ZERO_DATE = new Date(0);
export const MILLISECONDS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MINUTES_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;
export const DAYS_PER_WEEK = 7;
export const MONTHS_PER_YEAR = 12;

/**
 * Size constants
 */
export const BYTES_PER_KB = 1024;
export const BYTES_PER_MB = 1024 * 1024;
export const BYTES_PER_GB = 1024 * 1024 * 1024;

/**
 * Day names
 */
export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

/**
 * Month names
 */
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/**
 * Audit field names commonly found in DTOs
 */
export const AUDIT_FIELDS = [
  'createdAt',
  'created_at',
  'updatedAt',
  'updated_at',
  'deletedAt',
  'deleted_at',
  'createdBy',
  'created_by',
  'updatedBy',
  'updated_by',
  'deletedBy',
  'deleted_by',
  '__v',
  '_v',
] as const;

/**
 * HTTP methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
} as const;

export type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];
