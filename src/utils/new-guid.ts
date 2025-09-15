import { v4 as uuidV4 } from 'uuid';

/**
 * Generates a new version 4 UUID (GUID) using the `uuid` library.
 *
 * @returns {string} A standard v4 UUID string (e.g., 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').
 */
const newGuid = (): string => {
  return uuidV4();
};

export default newGuid;
