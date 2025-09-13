/**
 * HTTP request functions
 */

/**
 * Performs a GET request
 * @param url - URL to request
 * @param options - Fetch options
 * @returns Response data or null if error
 */
export async function doGet(url: string, options?: RequestInit): Promise<any> {
  try {
    if (!url || typeof url !== 'string') {
      return null;
    }

    const response = await fetch(url, {
      method: 'GET',
      ...options,
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  } catch {
    return null;
  }
}

/**
 * Performs a POST request
 * @param url - URL to request
 * @param body - Request body
 * @param options - Additional fetch options
 * @returns Response data or null if error
 */
export async function doPost(url: string, body?: any, options?: RequestInit): Promise<any> {
  try {
    if (!url || typeof url !== 'string') {
      return null;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options?.headers as Record<string, string>) || {}),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  } catch {
    return null;
  }
}

/**
 * Performs a PUT request
 * @param url - URL to request
 * @param body - Request body
 * @param options - Additional fetch options
 * @returns Response data or null if error
 */
export async function doPut(url: string, body?: any, options?: RequestInit): Promise<any> {
  try {
    if (!url || typeof url !== 'string') {
      return null;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options?.headers as Record<string, string>) || {}),
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  } catch {
    return null;
  }
}

/**
 * Performs a DELETE request
 * @param url - URL to request
 * @param options - Fetch options
 * @returns Response data or null if error
 */
export async function doDelete(url: string, options?: RequestInit): Promise<any> {
  try {
    if (!url || typeof url !== 'string') {
      return null;
    }

    const response = await fetch(url, {
      method: 'DELETE',
      ...options,
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  } catch {
    return null;
  }
}

/**
 * Performs a GET request to the root path to check connectivity
 * @param url - Base URL to ping
 * @returns true if successful, false otherwise
 */
export async function ping(url: string): Promise<boolean> {
  try {
    if (!url || typeof url !== 'string') {
      return false;
    }

    // Ensure URL ends with / for root path
    const pingUrl = url.endsWith('/') ? url : `${url}/`;

    const response = await fetch(pingUrl, {
      method: 'GET',
      // Add timeout for ping
      signal: AbortSignal.timeout(5000),
    });

    return response.ok;
  } catch {
    return false;
  }
}
