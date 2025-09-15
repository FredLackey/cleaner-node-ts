const { exec } = require('child_process');

/**
 * Executes a shell command asynchronously using child_process.exec and returns a promise.
 * The promise resolves with the standard output or rejects with an error or standard error.
 * @param {string} command The shell command to execute.
 * @returns {Promise<{stdout: string}|{error: Error}|{stderr: string}>} A promise that resolves with the stdout or rejects with an error or stderr.
 */
const executePromise = command => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error })
        return;
      }
      if (stderr) {
        reject({ stderr });
        return;
      }
      resolve({
        stdout: stdout.trim()
      });
    });
  });
}

module.exports = executePromise;
