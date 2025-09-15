import newGuid from './new-guid';

/**
 * Generates a new unique identifier (UID) string.
 * It creates a standard GUID, removes the hyphens, and converts it to uppercase.
 *
 * @returns {string} A 32-character uppercase alphanumeric UID string.
 */
const newUid = (): string => {
  const guid = newGuid();
  return guid.split('-').join('').toUpperCase();
};

export default newUid;
