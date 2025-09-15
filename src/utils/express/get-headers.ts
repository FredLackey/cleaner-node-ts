/**
 * Retrieves all headers from an Express request object.
 * Handles potential errors during header retrieval.
 * @param {Express.Request} request The Express request object.
 * @returns {object|undefined} An object containing all headers, or undefined if an error occurs.
 */
const getHeaders = request => {
  try {
    const headers = request.getHeaders();
    return {
      ...headers
    };
  } catch (error) {
    console.debug('express/get-headers.js', { error });
    return undefined;
  }
};

module.exports = getHeaders;
