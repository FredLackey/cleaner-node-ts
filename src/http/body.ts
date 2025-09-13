/**
 * HTTP body parsing utilities
 */

export interface RequestLike {
  json?: () => Promise<unknown>;
  text?: () => Promise<string>;
  body?: unknown;
  on?: (event: string, handler: (chunk?: unknown) => void) => void;
  read?: () => unknown;
}

/**
 * Asynchronously extracts the request body from a request object
 * Works with Node.js HTTP request or any request object with compatible methods
 * @param request - Request object
 * @returns Parsed body or null if error
 */
export async function getBody(request: RequestLike): Promise<unknown> {
  try {
    if (!request) {
      return null;
    }

    // Check if request has json() method
    if (typeof request.json === 'function') {
      try {
        return await request.json();
      } catch {
        // If JSON parsing fails, try text
        if (typeof request.text === 'function') {
          return await request.text();
        }
      }
    }

    // Check if request has body property already parsed
    if (request.body !== undefined) {
      return request.body;
    }

    // For raw Node.js HTTP request, read the stream
    if (typeof request.on === 'function' && typeof request.read === 'function') {
      return new Promise((resolve, reject) => {
        let data = '';

        request.on!('data', (chunk: unknown) => {
          data += String(chunk);
        });

        request.on!('end', () => {
          try {
            // Try to parse as JSON first
            resolve(JSON.parse(data));
          } catch {
            // Return as string if not JSON
            resolve(data);
          }
        });

        request.on!('error', () => {
          reject(null);
        });
      });
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Experimental utility for extracting request body with auto-detection
 */
export const body = {
  getBody,
};
