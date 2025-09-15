/**
 * Extracts all query parameters from a URL string into an object.
 * @param {string} urlText The URL string to parse.
 * @returns {object} An object where keys are parameter names and values are parameter values.
 */
const getParams = urlText => {
  const url = new URL(urlText);
  const keys = url.searchParams.keys();
  const result = {};
  keys.forEach(key => {
    result[key] = url.searchParams.get(key);
  });
  return result;
};

module.exports = getParams;
