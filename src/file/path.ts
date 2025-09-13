/**
 * Path operations and utilities
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Checks if a given path points to an existing file
 * @param filePath - Path to check
 * @returns true if path exists and is a file
 */
export function isFile(filePath: string): boolean {
  try {
    if (!filePath || typeof filePath !== 'string') {
      return false;
    }

    const stats = fs.statSync(filePath);
    return stats.isFile();
  } catch {
    return false;
  }
}

/**
 * Checks if a given path points to an existing directory
 * @param dirPath - Path to check
 * @returns true if path exists and is a directory
 */
export function isFolder(dirPath: string): boolean {
  try {
    if (!dirPath || typeof dirPath !== 'string') {
      return false;
    }

    const stats = fs.statSync(dirPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Alias for isFolder
 */
export function isDirectory(dirPath: string): boolean {
  return isFolder(dirPath);
}

/**
 * Checks if a string appears to be a valid file/folder path
 * @param pathStr - String to check
 * @returns true if string appears to be a valid path
 */
export function isValidPath(pathStr: string): boolean {
  if (!pathStr || typeof pathStr !== 'string') {
    return false;
  }

  // Check for invalid characters
  const invalidChars = /[\0]/;
  if (invalidChars.test(pathStr)) {
    return false;
  }

  // Check if basename is valid
  const basename = path.basename(pathStr);
  if (!basename || basename === '.' || basename === '..') {
    return false;
  }

  return true;
}

/**
 * Checks if a value is not set or is a valid path
 * @param value - Value to check
 * @returns true if value is null/undefined or a valid path
 */
export function isValidPathIfSet(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  return isValidPath(value as string);
}

/**
 * Extracts the file name from a file path
 * @param filePath - Full file path
 * @param withExtension - Whether to include the extension (default: true)
 * @returns File name, or empty string if invalid
 */
export function getFileName(filePath: string, withExtension = true): string {
  try {
    if (!filePath || typeof filePath !== 'string') {
      return '';
    }

    if (withExtension) {
      return path.basename(filePath);
    }

    return path.basename(filePath, path.extname(filePath));
  } catch {
    return '';
  }
}

/**
 * Finds the longest common base directory path from an array of file paths
 * @param paths - Array of file paths
 * @returns Common base path, or empty string if no common path
 */
export function getCommonPath(paths: string[]): string {
  try {
    if (!Array.isArray(paths) || paths.length === 0) {
      return '';
    }

    // Filter out non-string values
    const validPaths = paths.filter((p) => p && typeof p === 'string');
    if (validPaths.length === 0) {
      return '';
    }

    if (validPaths.length === 1) {
      return path.dirname(validPaths[0] || '');
    }

    // Normalize all paths
    const normalized = validPaths.map((p) => path.normalize(p));

    // Split paths into segments
    const segments = normalized.map((p) => p.split(path.sep));

    // Find common segments
    const commonSegments: string[] = [];
    const minLength = Math.min(...segments.map((s) => s.length));

    for (let i = 0; i < minLength; i++) {
      const segment = segments[0]?.[i];
      if (segment && segments.every((s) => s[i] === segment)) {
        commonSegments.push(segment);
      } else {
        break;
      }
    }

    if (commonSegments.length === 0) {
      return '';
    }

    // Join segments back into a path
    const commonPath = commonSegments.join(path.sep);

    // Ensure it's a valid directory path
    if (fs.existsSync(commonPath) && fs.statSync(commonPath).isDirectory()) {
      return commonPath;
    }

    // If the common path doesn't exist or isn't a directory,
    // return the parent directory
    return path.dirname(commonPath);
  } catch {
    return '';
  }
}

/**
 * Creates a directory path recursively if it doesn't exist
 * @param dirPath - Directory path to create
 * @returns true if successful or already exists
 */
export function createPath(dirPath: string): boolean {
  try {
    if (!dirPath || typeof dirPath !== 'string') {
      return false;
    }

    if (fs.existsSync(dirPath)) {
      return fs.statSync(dirPath).isDirectory();
    }

    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

/**
 * Alias for createPath
 */
export function makePath(dirPath: string): boolean {
  return createPath(dirPath);
}
