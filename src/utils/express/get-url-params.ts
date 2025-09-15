/**
 * Extracts all query parameters from a URL string into an object.
 * @param {string} urlText The URL string to parse.
 * @returns {object} An object where keys are parameter names and values are parameter values.
 */
const getParams = (urlText: string): object => {
  const url = new URL(urlText);
  const keys = Array.from(url.searchParams.keys());
  const result = {};
  keys.forEach(key => {
    result[key] = url.searchParams.get(key);
  });
  return result;
};

export default getParams;
