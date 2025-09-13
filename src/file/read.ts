/**
 * File reading operations
 */

import * as fs from 'fs';
import * as path from 'path';
import type { Nullable } from '../types';

/**
 * Synchronously reads the contents of a file
 * @param filePath - Path to the file to read
 * @returns File contents as string, or null if file doesn't exist or error occurs
 */
export function readFile(filePath: string): Nullable<string> {
  try {
    if (!filePath || typeof filePath !== 'string') {
      return null;
    }

    if (!fs.existsSync(filePath)) {
      return null;
    }

    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

/**
 * Alias for readFile
 */
export function getFileContents(filePath: string): Nullable<string> {
  return readFile(filePath);
}

/**
 * Reads a file and parses its content as JSON
 * @param filePath - Path to the JSON file
 * @returns Parsed JSON object/array, or null if parsing fails
 */
export function loadJson(filePath: string): any {
  try {
    const content = readFile(filePath);
    if (!content) {
      return null;
    }

    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Asynchronously reads a file line by line
 * @param filePath - Path to the file
 * @returns Array of lines, or empty array if error
 */
export async function readLines(filePath: string): Promise<string[]> {
  try {
    if (!filePath || typeof filePath !== 'string') {
      return [];
    }

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const content = await fs.promises.readFile(filePath, 'utf8');
    return content.split(/\r?\n/);
  } catch {
    return [];
  }
}

/**
 * Gets the size of a file in bytes
 * @param filePath - Path to the file
 * @returns File size in bytes, or 0 if file doesn't exist
 */
export function getFileSize(filePath: string): number {
  try {
    if (!filePath || typeof filePath !== 'string') {
      return 0;
    }

    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

/**
 * Reads the contents of a directory
 * @param dirPath - Path to the directory
 * @returns Array of full paths for direct children (files and subdirectories)
 */
export function getFiles(dirPath: string): string[] {
  try {
    if (!dirPath || typeof dirPath !== 'string') {
      return [];
    }

    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      return [];
    }

    const files = fs.readdirSync(dirPath);
    return files.map((file) => path.join(dirPath, file));
  } catch {
    return [];
  }
}

/**
 * Alias for getFiles
 */
export function getFolderContents(dirPath: string): string[] {
  return getFiles(dirPath);
}

/**
 * Walks a directory recursively and returns all files and folders
 * @param dirPath - Path to the directory to walk
 * @returns Object containing arrays of all files and folders found
 */
export function walk(dirPath: string): { files: string[]; folders: string[] } {
  const result = { files: [] as string[], folders: [] as string[] };

  try {
    if (!dirPath || typeof dirPath !== 'string') {
      return result;
    }

    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      return result;
    }

    const walkDir = (currentPath: string): void => {
      const items = fs.readdirSync(currentPath);

      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        try {
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            result.folders.push(fullPath);
            walkDir(fullPath);
          } else if (stat.isFile()) {
            result.files.push(fullPath);
          }
        } catch {
          // Skip items we can't access
        }
      }
    };

    result.folders.push(dirPath);
    walkDir(dirPath);

    return result;
  } catch {
    return result;
  }
}
