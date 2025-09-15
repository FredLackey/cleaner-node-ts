const isValidString = require('./is-valid-string');
const getFolderContents = require('./get-folder-contents');
const isFile = require('./is-file');
const isFolder = require('./is-folder');
const os = require('os');

/**
 * Recursively walks a folder and collects the paths of files and subfolders relative to the root.
 * This is an internal helper function for `walk`.
 *
 * @param {string} folderPath - The path of the folder to walk.
 * @param {object} results - An object to store the results (files and folders lists).
 * @param {string} results.root - The root path of the walk.
 * @param {string[]} results.files - An array to store relative file paths.
 * @param {string[]} results.folders - An array to store relative folder paths.
 */
const walkFolder = (folderPath, results) => {
  if (!isValidString(folderPath)) { return; }
  const paths = getFolderContents(folderPath) || [];
  paths.forEach(p => {
    if (isFile(p)) {
      results.files.push(p.substring(results.root.length));
    } else if (isFolder(p)) {
      results.folders.push(p.substring(results.root.length));
      walkFolder(p, results);
    }
  });
};

/**
 * Walks a directory recursively and returns an object containing lists of all files and folders found,
 * with paths relative to the starting folder.
 *
 * @param {string} folderPath - The path of the directory to start walking from.
 * @returns {object|undefined} An object with `root`, `folders`, and `files` properties, or undefined if the initial path is not a folder.
 * @returns {string} return.root - The absolute path of the folder that was walked.
 * @returns {string[]} return.folders - An array of folder paths relative to the root.
 * @returns {string[]} return.files - An array of file paths relative to the root.
 */
const walk = (folderPath) => {
  if (!isFolder(folderPath)) { return undefined; }
  const results = {
    root    : folderPath,
    folders : [],
    files   : []
  };
  walkFolder(folderPath, results);
  return results;
};

module.exports = walk;
