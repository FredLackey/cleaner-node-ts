/**
 * Command execution utilities
 */

import { exec, execSync } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

/**
 * Execute a command synchronously
 * @param command - Command to execute
 * @param options - Execution options
 * @returns Command output or null if error
 */
export function execute(command: string, options?: any): string | null {
  try {
    if (!command || typeof command !== 'string') {
      return null;
    }

    const result = execSync(command, {
      encoding: 'utf8',
      ...options,
    });

    return result.toString();
  } catch {
    return null;
  }
}

/**
 * Execute a command asynchronously
 * @param command - Command to execute
 * @param options - Execution options
 * @returns Promise with command output
 */
export async function executePromise(command: string, options?: any): Promise<string | null> {
  try {
    if (!command || typeof command !== 'string') {
      return null;
    }

    const { stdout } = await execPromise(command, {
      encoding: 'utf8',
      ...options,
    });

    return stdout.toString();
  } catch {
    return null;
  }
}

/**
 * Execution module
 */
export const execution = {
  execute,
  executePromise,
};
