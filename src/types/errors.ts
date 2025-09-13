/**
 * Custom error types for better error handling
 */

export class CleanerError extends Error {
  public readonly code: string;
  public readonly details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = 'CleanerError';
    this.code = code;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CleanerError);
    }
  }
}

export class ValidationError extends CleanerError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class FileSystemError extends CleanerError {
  constructor(message: string, details?: any) {
    super(message, 'FILESYSTEM_ERROR', details);
    this.name = 'FileSystemError';
  }
}

export class ParseError extends CleanerError {
  constructor(message: string, details?: any) {
    super(message, 'PARSE_ERROR', details);
    this.name = 'ParseError';
  }
}

export class NetworkError extends CleanerError {
  constructor(message: string, details?: any) {
    super(message, 'NETWORK_ERROR', details);
    this.name = 'NetworkError';
  }
}

export class CryptoError extends CleanerError {
  constructor(message: string, details?: any) {
    super(message, 'CRYPTO_ERROR', details);
    this.name = 'CryptoError';
  }
}

/**
 * Error code constants
 */
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  FILESYSTEM_ERROR: 'FILESYSTEM_ERROR',
  PARSE_ERROR: 'PARSE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  CRYPTO_ERROR: 'CRYPTO_ERROR',
  INVALID_ARGUMENT: 'INVALID_ARGUMENT',
  NOT_FOUND: 'NOT_FOUND',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  TIMEOUT: 'TIMEOUT',
  UNKNOWN: 'UNKNOWN',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
