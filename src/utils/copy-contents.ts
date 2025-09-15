/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import os from 'os';
import readline from 'readline';

/**
 * Asynchronously copies the contents of a source file to a destination file, line by line.
 * Uses OS-specific end-of-line characters.
 * @param {string} sourceFile The path to the source file.
 * @param {string} destinationFile The path to the destination file. It will be created or overwritten.
 * @returns {void} The copy operation is complete.
 */
const copyContents = async (sourceFile: string, destinationFile: string): Promise<void> => {
  const inStream  = fs.createReadStream(sourceFile);
  const inFile    = readline.createInterface({
    input: inStream,
    crlfDelay: Infinity
  });
  const outStream = fs.createWriteStream(destinationFile);

  for await (const line of inFile) {
    outStream.write(line + os.EOL);
  }

  outStream.end();
  outStream.close();
};

export default copyContents;
