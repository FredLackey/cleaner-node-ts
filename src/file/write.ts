/**
 * File writing operations
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

/**
 * Writes content to a file, creating directory structure if needed
 * @param filePath - Path to the file to write
 * @param content - Content to write to the file
 * @returns true if successful, false otherwise
 */
export function writeFile(filePath: string, content: string): boolean {
  try {
    if (!filePath || typeof filePath !== 'string') {
      return false;
    }

    if (content === undefined || content === null) {
      return false;
    }

    // Create directory structure if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, String(content), 'utf8');
    return true;
  } catch {
    return false;
  }
}

/**
 * Converts an object or array to JSON and saves it to a file
 * @param filePath - Path to the file
 * @param data - Data to save as JSON
 * @param pretty - Whether to format the JSON with indentation (default: true)
 * @returns true if successful, false otherwise
 */
export function saveJson(filePath: string, data: any, pretty = true): boolean {
  try {
    if (!filePath || typeof filePath !== 'string') {
      return false;
    }

    if (data === undefined) {
      return false;
    }

    const jsonString = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);

    return writeFile(filePath, jsonString);
  } catch {
    return false;
  }
}

/**
 * Writes an array of strings to a file, joining with OS-specific EOL
 * @param filePath - Path to the file
 * @param lines - Array of lines to write
 * @returns true if successful, false otherwise
 */
export function writeLines(filePath: string, lines: string[]): boolean {
  try {
    if (!filePath || typeof filePath !== 'string') {
      return false;
    }

    if (!Array.isArray(lines)) {
      return false;
    }

    const content = lines.join(os.EOL);
    return writeFile(filePath, content);
  } catch {
    return false;
  }
}

/**
 * Asynchronously copies file contents line by line
 * @param sourcePath - Source file path
 * @param destPath - Destination file path
 * @returns Promise that resolves to true if successful
 */
export async function copyContents(sourcePath: string, destPath: string): Promise<boolean> {
  try {
    if (!sourcePath || !destPath) {
      return false;
    }

    if (typeof sourcePath !== 'string' || typeof destPath !== 'string') {
      return false;
    }

    if (!fs.existsSync(sourcePath)) {
      return false;
    }

    const content = await fs.promises.readFile(sourcePath, 'utf8');

    // Create directory structure if needed
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }

    await fs.promises.writeFile(destPath, content, 'utf8');
    return true;
  } catch {
    return false;
  }
}
