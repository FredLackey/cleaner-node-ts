/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const os = require('os');
const readline = require('readline');

/**
 * Asynchronously copies the contents of a source file to a destination file, line by line.
 * Uses OS-specific end-of-line characters.
 * @param {string} sourceFile The path to the source file.
 * @param {string} destinationFile The path to the destination file. It will be created or overwritten.
 * @returns {Promise<void>} A promise that resolves when the copy operation is complete.
 */
const copyContents = async (sourceFile, destinationFile) => {
  const inStream  = fs.createReadStream(sourceFile);
  const inFile    = await readline.createInterface({
    input: inStream,
    crlfDelay: Infinity
  });
  const outStream = fs.createWriteStream(destinationFile);

  for await (const line of inFile) {
    await outStream.write(line + os.EOL);
  }

  await outStream.end();
  await outStream.close();
};

module.exports = copyContents;
