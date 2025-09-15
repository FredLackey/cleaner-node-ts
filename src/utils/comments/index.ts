import multiLine from './multi-line';
import singleLine from './single-line';
import toResult from '../to-result';

/**
 * Checks if a line or array of lines contains single-line or multi-line comments.
 * @param {string|string[]} lineOrLines The input line or lines.
 * @returns {boolean} True if comments are found, false otherwise.
 */
const hasComments = (lineOrLines: string | string[]): boolean => {
  // Check for single-line comments using hasDelimeter
  const hasSingleLineComments = Array.isArray(lineOrLines)
    ? lineOrLines.some(line => singleLine.hasDelimeter(line))
    : singleLine.hasDelimeter(lineOrLines);

  // Multi-line comments detection would need to be implemented
  // For now, just check single-line comments
  return hasSingleLineComments;
};
/**
 * Removes single-line and multi-line comments from a line or an array of lines.
 * @param {string|string[]} lineOrLines The input line or lines.
 * @returns {string|string[]} The line or lines with comments removed, maintaining the original input type (string or array).
 */
const removeComments = (lineOrLines: string | string[]): string | string[] => {

  const results = [].concat(lineOrLines).map((line: string) => {

    let processedLine = singleLine.removeComments(line);
    // If singleLine.removeComments returns an array, use the first element
    if (Array.isArray(processedLine)) {
      processedLine = processedLine[0] || '';
    }

    // For multi-line comments, pass as array and get back array
    const multiLineResult = multiLine.removeComments([processedLine]);
    const finalResult = Array.isArray(multiLineResult) ? multiLineResult[0] : multiLineResult;

    return finalResult;

  });

  return toResult(results, lineOrLines);

};

export default {
  multiLine,
  singleLine,

  hasComments,
  removeComments,
};
