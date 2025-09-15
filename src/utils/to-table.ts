const COL_DELIM = '|';
const LINE_CHAR = '-';

/**
 * Calculates the maximum width needed for each column based on the content in the lines.
 *
 * @param {string[]} lines - An array of strings, where each string represents a row and contains delimited columns.
 * @param {string} delimiter - The character used to delimit columns within each line.
 * @returns {number[]} An array of numbers representing the maximum width of each column.
 */
const getColumnWidths = (lines, delimiter) => {
  const results = [];
  lines.forEach(line => {
    const parts = line.split(delimiter);
    for (let i = 0; i < parts.length; i += 1) {
      const { length } = parts[i].trim();
      if (results.length < (i + 1)) {
        results.push(length);
      } else if (results[i] < length) {
        results[i] = length;
      }
    }
  });
  return results;
};

/**
 * Adds a horizontal line separator to the table cache based on the calculated column widths.
 *
 * @param {object} cache - The cache object holding table construction state.
 * @param {number[]} cache.widths - Array of maximum column widths.
 * @param {string[]} cache.lines - Array storing the formatted lines of the table.
 */
const addHeader = cache => {
  const parts = [];
  cache.widths.forEach(width => {
    parts.push(''.padEnd(width + 2, LINE_CHAR));
  });
  const line = COL_DELIM + parts.join(COL_DELIM) + COL_DELIM;
  cache.lines.push(line);
};

/**
 * Formats a single row (provided as an array of parts) and adds it to the table cache.
 * Pads each part according to the corresponding column width.
 *
 * @param {object} cache - The cache object holding table construction state.
 * @param {number[]} cache.widths - Array of maximum column widths.
 * @param {string[]} cache.lines - Array storing the formatted lines of the table.
 * @param {string[]} lineParts - An array of strings representing the parts of the current row.
 */
const addLine = (cache, lineParts) => {
  const parts = [];
  for (let i = 0; i < lineParts.length; i += 1) {
    const value = lineParts[i].trim().padEnd(cache.widths[i]);
    parts.push(` ${value} `);
  }
  cache.lines.push(COL_DELIM + parts.join(COL_DELIM) + COL_DELIM);
};

/**
 * Converts an array of delimited strings into a formatted text table with borders.
 * Inserts a header line after the first row.
 *
 * @param {string[]} lines - An array of strings, each representing a row with delimited columns.
 * @param {string} delimiter - The character used to delimit columns.
 * @returns {string[]} An array of strings, representing the formatted lines of the text table.
 */
const toTable = (lines, delimiter) => {
  const cache = {
    widths  : getColumnWidths(lines, delimiter),
    lines   : []
  };
  lines.forEach(line => {
    if (cache.lines.length === 1) {
      addHeader(cache);
    }
    addLine(cache, line.split(delimiter));
  });

  return cache.lines;
};

module.exports = toTable;
