/**
 * Object transformation functions
 */

import { isObject } from '../validation';
import { isIsoDate } from '../validation/format-checks';

/**
 * Converts string representations within DTOs to JS types (e.g., ISO strings to Dates)
 * Modifies input in place.
 */
export function fromDto<T>(dto: T): T {
  if (!dto) return dto;

  if (Array.isArray(dto)) {
    dto.forEach((item, index) => {
      dto[index] = fromDto(item);
    });
    return dto;
  }

  if (isObject(dto)) {
    const obj = dto as any;

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        // Convert ISO date strings to Date objects
        if (isIsoDate(value)) {
          obj[key] = new Date(value);
        }
        // Convert "true"/"false" strings to booleans
        else if (value === 'true') {
          obj[key] = true;
        } else if (value === 'false') {
          obj[key] = false;
        }
        // Convert numeric strings to numbers
        else if (/^-?\d+(\.\d+)?$/.test(value)) {
          const num = Number(value);
          if (!isNaN(num)) {
            obj[key] = num;
          }
        }
      } else if (value !== null && value !== undefined) {
        obj[key] = fromDto(value);
      }
    }

    return obj;
  }

  return dto;
}

/**
 * Transforms a raw HTTP request object into a standardized format
 */
export function toRequest(req: unknown): any {
  if (!isObject(req)) return {};

  const request = req as any;
  const result: any = {
    method: request.method || 'GET',
    url: request.url || request.path || '/',
    headers: {},
    query: {},
    params: {},
    body: undefined,
  };

  // Extract headers
  if (request.headers && isObject(request.headers)) {
    result.headers = { ...request.headers };
  }

  // Extract query parameters
  if (request.query && isObject(request.query)) {
    result.query = { ...request.query };
  }

  // Extract route parameters
  if (request.params && isObject(request.params)) {
    result.params = { ...request.params };
  }

  // Extract body
  if (request.body !== undefined) {
    result.body = request.body;
  }

  // Extract cookies if present
  if (request.cookies && isObject(request.cookies)) {
    result.cookies = { ...request.cookies };
  }

  // Extract user if authenticated
  if (request.user !== undefined) {
    result.user = request.user;
  }

  return result;
}

/**
 * Formats a response based on the structure of the original input
 */
export function toResponse(data: unknown, error?: unknown): any {
  const response: any = {
    success: !error,
    timestamp: new Date().toISOString(),
  };

  if (error) {
    response.error =
      error instanceof Error
        ? {
            message: error.message,
            name: error.name,
            stack: error.stack,
          }
        : error;
  }

  if (data !== undefined) {
    response.data = data;

    // Add metadata for arrays
    if (Array.isArray(data)) {
      response.count = data.length;
    }
  }

  return response;
}

/**
 * Alias for toRequest
 */
export const toReq = toRequest;

/**
 * Creates a replacer function for JSON.stringify that handles circular references
 */
export function getCircularReplacer(): (key: string, value: unknown) => unknown {
  const seen = new WeakSet();

  return (_key: string, value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }

    // Handle special types
    if (value instanceof Date) {
      return value.toISOString();
    }

    if (value instanceof RegExp) {
      return value.toString();
    }

    if (value instanceof Error) {
      return {
        name: value.name,
        message: value.message,
        stack: value.stack,
      };
    }

    return value;
  };
}

/**
 * Safely parses a JSON string into a JavaScript object
 */
export function parseJson(value: unknown): unknown {
  if (typeof value !== 'string') return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * Generates a hash value for a given object or array
 */
export function hashObject(obj: unknown): string {
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';

  try {
    const str = JSON.stringify(obj, Object.keys(obj as any).sort());

    // Simple hash function (djb2 algorithm)
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }

    return (hash >>> 0).toString(16);
  } catch {
    return '';
  }
}
