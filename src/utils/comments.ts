/**
 * Code comment utilities
 */

/**
 * Checks if code contains comments
 * @param code - Code to check
 * @returns true if code contains comments
 */
export function hasComments(code: string): boolean {
  if (!code || typeof code !== 'string') {
    return false;
  }

  // Check for single-line comments
  if (code.includes('//')) {
    return true;
  }

  // Check for multi-line comments
  if (code.includes('/*') || code.includes('*/')) {
    return true;
  }

  // Check for HTML comments
  if (code.includes('<!--') || code.includes('-->')) {
    return true;
  }

  // Check for Python/Shell comments
  if (code.includes('#')) {
    // Make sure it's not part of a string
    const lines = code.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Removes comments from code
 * @param code - Code to clean
 * @param language - Language type (js, css, html, python, etc.)
 * @returns Code without comments
 */
export function removeComments(code: string, language = 'js'): string {
  if (!code || typeof code !== 'string') {
    return '';
  }

  let result = code;

  switch (language.toLowerCase()) {
    case 'js':
    case 'javascript':
    case 'ts':
    case 'typescript':
    case 'java':
    case 'c':
    case 'cpp':
    case 'cs':
      // Remove single-line comments
      result = result.replace(/\/\/.*$/gm, '');
      // Remove multi-line comments
      result = result.replace(/\/\*[\s\S]*?\*\//g, '');
      break;

    case 'css':
    case 'scss':
    case 'sass':
      // Remove CSS comments
      result = result.replace(/\/\*[\s\S]*?\*\//g, '');
      break;

    case 'html':
    case 'xml':
      // Remove HTML/XML comments
      result = result.replace(/<!--[\s\S]*?-->/g, '');
      break;

    case 'python':
    case 'py':
    case 'ruby':
    case 'rb':
    case 'shell':
    case 'sh':
    case 'bash':
      // Remove # comments
      result = result.replace(/^#.*$/gm, '');
      result = result.replace(/\s+#.*$/gm, '');
      break;

    case 'sql':
      // Remove SQL comments
      result = result.replace(/--.*$/gm, '');
      result = result.replace(/\/\*[\s\S]*?\*\//g, '');
      break;

    default:
      // Try to remove common comment patterns
      result = result.replace(/\/\/.*$/gm, '');
      result = result.replace(/\/\*[\s\S]*?\*\//g, '');
      result = result.replace(/^#.*$/gm, '');
      result = result.replace(/<!--[\s\S]*?-->/g, '');
  }

  // Clean up extra blank lines
  result = result.replace(/\n\s*\n\s*\n/g, '\n\n');

  return result.trim();
}

/**
 * Comments module
 */
export const comments = {
  hasComments,
  removeComments,
};
