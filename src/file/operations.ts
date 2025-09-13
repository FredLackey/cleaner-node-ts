/**
 * File operations (copy, move, delete)
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Synchronously copies a file from source to target
 * @param sourcePath - Source file path
 * @param targetPath - Target file path
 * @returns true if successful
 */
export function copyFile(sourcePath: string, targetPath: string): boolean {
  try {
    if (!sourcePath || !targetPath) {
      return false;
    }

    if (typeof sourcePath !== 'string' || typeof targetPath !== 'string') {
      return false;
    }

    if (!fs.existsSync(sourcePath)) {
      return false;
    }

    // Create target directory if it doesn't exist
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.copyFileSync(sourcePath, targetPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Moves a file from source to destination
 * @param sourcePath - Source file path
 * @param destPath - Destination file path
 * @returns true if successful
 */
export function moveFile(sourcePath: string, destPath: string): boolean {
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

    // Create destination directory if it doesn't exist
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.renameSync(sourcePath, destPath);
    return true;
  } catch (error: unknown) {
    // If rename fails (e.g., across drives), try copy and delete
    if (error instanceof Error && 'code' in error && error.code === 'EXDEV') {
      try {
        if (copyFile(sourcePath, destPath)) {
          fs.unlinkSync(sourcePath);
          return true;
        }
      } catch {
        return false;
      }
    }
    return false;
  }
}

/**
 * Synchronously deletes a file
 * @param filePath - Path to the file to delete
 * @returns true if successful
 */
export function deleteFile(filePath: string): boolean {
  try {
    if (!filePath || typeof filePath !== 'string') {
      return false;
    }

    if (!fs.existsSync(filePath)) {
      return true; // Already deleted
    }

    if (!fs.statSync(filePath).isFile()) {
      return false; // Not a file
    }

    fs.unlinkSync(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Synchronously deletes a directory and its contents recursively
 * @param dirPath - Path to the directory to delete
 * @returns true if successful
 */
export function deleteDirectory(dirPath: string): boolean {
  try {
    if (!dirPath || typeof dirPath !== 'string') {
      return false;
    }

    if (!fs.existsSync(dirPath)) {
      return true; // Already deleted
    }

    if (!fs.statSync(dirPath).isDirectory()) {
      return false; // Not a directory
    }

    // Use rimraf-like functionality
    const deleteFolderRecursive = (folderPath: string): void => {
      if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
          const curPath = path.join(folderPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
            deleteFolderRecursive(curPath);
          } else {
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(folderPath);
      }
    };

    deleteFolderRecursive(dirPath);
    return true;
  } catch {
    // Try using native recursive option (Node 14.14.0+)
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      return true;
    } catch {
      return false;
    }
  }
}
