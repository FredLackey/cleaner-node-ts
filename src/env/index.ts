/**
 * Environment variable utilities
 */

/**
 * Retrieves environment variables, optionally filtering and sorting
 * @param filter - Optional string to filter variable names
 * @param sort - Whether to sort the results (default: true)
 * @returns Object containing environment variables
 */
export function getVars(filter?: string, sort = true): Record<string, string> {
  const env = process.env;
  const result: Record<string, string> = {};

  // Get all env vars or filter them
  const keys = Object.keys(env);
  const filteredKeys = filter
    ? keys.filter((key) => key.toLowerCase().includes(filter.toLowerCase()))
    : keys;

  // Sort if requested
  const finalKeys = sort ? filteredKeys.sort() : filteredKeys;

  // Build result object
  for (const key of finalKeys) {
    const value = env[key];
    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Environment module containing all env utilities
 */
export const env = {
  getVars,
};
