/**
 * Safely parses a JSON string into a JavaScript object.
 * Returns the parsed object or undefined if parsing fails (e.g., invalid JSON).
 * Logs the error to the debug console if parsing fails.
 *
 * @param {string} rawJson - The JSON string to parse.
 * @returns {object|undefined} The parsed JavaScript object, or undefined if parsing fails.
 */
const parseJson = (rawJson, debugErrors = true) => {
  let obj;
  try {
    obj = JSON.parse(rawJson);
  } catch (ex) {
    if (debugErrors) {
      console.debug(ex);
    }
    return undefined;
  }
  return obj;
};

module.exports = parseJson;
