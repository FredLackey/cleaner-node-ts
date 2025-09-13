/**
 * Common type definitions used throughout the library
 */

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type NullableOptional<T> = T | null | undefined;
export type Primitive = string | number | boolean | null | undefined;

/**
 * String cleaning options
 */
export interface CleanStringOptions {
  validChars?: string;
  invalidChars?: string;
  trim?: boolean;
}

/**
 * Array unique options
 */
export interface UniqueOptions {
  caseSensitive?: boolean;
  trim?: boolean;
}

/**
 * String matching options
 */
export interface MatchOptions {
  caseSensitive?: boolean;
  trimmed?: boolean;
}

/**
 * Hash options
 */
export interface HashOptions {
  algorithm?: 'md5' | 'sha1' | 'sha256' | 'sha512';
  encoding?: 'hex' | 'base64' | 'base64url';
}

/**
 * HTTP request options
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  body?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

/**
 * JWT options
 */
export interface JwtOptions {
  algorithm?: string;
  expiresIn?: string | number;
  notBefore?: string | number;
  audience?: string | string[];
  issuer?: string;
  jwtid?: string;
  subject?: string;
  noTimestamp?: boolean;
  header?: object;
  keyid?: string;
}

/**
 * File operation options
 */
export interface FileOptions {
  encoding?: BufferEncoding;
  flag?: string;
  mode?: number;
}

/**
 * Directory walk result
 */
export interface WalkResult {
  files: string[];
  folders: string[];
}

/**
 * Padding information
 */
export interface PadInfo {
  prefix: number;
  suffix: number;
}

/**
 * Duration format result
 */
export interface Duration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  formatted: string;
}

/**
 * JWT parse result
 */
export interface JwtParseResult {
  valid: boolean;
  expired: boolean;
  claims?: any;
  payload?: any;
  header?: any;
  signature?: string;
  error?: string;
}

/**
 * Type guard helpers
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function isSet<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
