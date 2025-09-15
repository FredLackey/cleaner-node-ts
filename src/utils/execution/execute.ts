const executePromise = require('./execute-promise');

/**
 * Executes a shell command asynchronously and returns an object indicating success or failure.
 * Wraps the executePromise function to provide a consistent success/error structure.
 * @param {string} command The shell command to execute.
 * @returns {Promise<{success: boolean, output?: {stdout: string}, error?: {error: Error}|{stderr: string}}>} An object indicating the outcome of the command execution.
 */
const execute = async command => {
  try {
    const output = await executePromise(command);
    return {
      success: true,
      output
    }
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};

module.exports = execute;