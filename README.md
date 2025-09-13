# cleaner-node-ts

[![npm version](https://badge.fury.io/js/cleaner-node-ts.svg)](https://badge.fury.io/js/cleaner-node-ts)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

TypeScript-first port of the popular `cleaner-node` utility library - making Node.js code more legible and maintainable.

## Background

This is a complete TypeScript rewrite of the original [`cleaner-node`](https://github.com/FredLackey/cleaner-node) package, maintaining 100% API compatibility while adding full type safety and modern JavaScript features.

There are several libraries out there designed to make life easier for developers (`moment`, `lodash`, `underscore`, etc.). However, for the most part, the goals of those utilities are to *add on* to what Node and JavaScript bring to the table. And, as Node and JavaScript mature, developers find them to be less of a _necessity_ and end up removing them.

While `cleaner-node-ts` is _also_ a helper package, and completely unnecessary, its goal is to abstract some of the more redundant and verbose syntaxes. The end result is a codebase that still functions as it would _without_ `cleaner-node-ts` but is easier to read *and maintain*. Unlike those other libraries, which shrink over time, this library intends to grow for as long as Node exists, so developers don't have to write the same code again, and again, and again...

## Installation

```bash
npm install cleaner-node-ts
```

## Requirements

- **Node.js**: >= 20.0.0
- **TypeScript**: >= 5.0.0 (for TypeScript projects only)
- **Zero runtime dependencies** (except Node.js built-ins)

## Usage

### JavaScript (CommonJS)

```javascript
const _ = require('cleaner-node-ts');

// String manipulation
const cleaned = _.cleanString('  Hello World!  '); // "Hello World!"
const isValid = _.isValidString(cleaned); // true

// Array operations
const unique = _.unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
const first = _.getFirst(['a', 'b', 'c']); // 'a'

// Validation
const isEmail = _.isEmail('user@example.com'); // true
const isGuid = _.isGuidFormat('550e8400-e29b-41d4-a716-446655440000'); // true
```

### JavaScript (ESM)

```javascript
import _ from 'cleaner-node-ts';

// All the same functions available
const tomorrow = _.addDays(new Date(), 1);
const guid = _.newGuid();
```

### TypeScript

```typescript
import _ from 'cleaner-node-ts';
// Or for specific imports:
// import { cleanString, isEmail, newGuid } from 'cleaner-node-ts';

// Full type safety and IntelliSense
const cleaned: string = _.cleanString('  Hello World!  ');
const isValid: boolean = _.isValidString(cleaned);

// Array operations with proper typing
const unique: number[] = _.unique([1, 2, 2, 3, 3, 3]);
const first: string | undefined = _.getFirst(['a', 'b', 'c']);

// Object manipulation with type inference
const cleaned = _.cleanObject({ name: 'John', age: undefined });
// Type: { name: string }

// Date utilities with Date type safety
const tomorrow: Date = _.addDays(new Date(), 1);
const timestamp: number = _.toEpoch(new Date());
```

## Features

- 🎯 **TypeScript-first**: Built with TypeScript from the ground up with full type definitions
- 🔄 **100% Compatible**: Drop-in replacement for original `cleaner-node` package
- 📦 **Dual Package Support**: Works with both CommonJS and ESM modules
- 🌳 **Tree-shakeable**: Import only what you need with ESM
- 🚀 **203 Functions**: Complete implementation of all original utilities
- 🔒 **Type-safe**: Full type inference and strict mode support
- 📚 **Well-documented**: Comprehensive JSDoc comments for all functions
- ⚡ **Zero dependencies**: Minimal footprint, only uses Node.js built-ins

## Migration from cleaner-node

Migrating from the original `cleaner-node` package is straightforward:

```bash
# Uninstall original package
npm uninstall cleaner-node

# Install TypeScript version
npm install cleaner-node-ts
```

```javascript
// Before (cleaner-node)
const _ = require('cleaner-node');

// After (cleaner-node-ts) - No code changes needed!
const _ = require('cleaner-node-ts');
```

All function signatures and behaviors are identical to the original package. The only difference is that you now get full TypeScript support if you're using TypeScript.

## Complete Function Reference

The library includes **203 utility functions** organized into the following categories:

### Core Categories

- **Validation** (46 functions) - Type checking, format validation, and data verification
- **String Manipulation** (30+ functions) - Cleaning, formatting, and string operations
- **Array Operations** (24+ functions) - Array utilities, unique values, and transformations
- **Object Operations** (22+ functions) - Object manipulation, cleaning, and deep operations
- **File System** (24 functions) - Synchronous file operations and path utilities
- **Date/Time** (14 functions) - Date manipulation and formatting
- **Cryptography & JWT** (18 functions) - Hashing, encryption, and JWT handling
- **HTTP Utilities** (6 functions) - REST operations and request handling
- **Environment** - Environment variable management
- **ID Generation** - GUID, UID, and code generation

### Popular Functions

#### String Operations
- `cleanString(value)` - Clean and normalize strings
- `trimToNull(str)` - Trim string or return null if empty
- `getEmail(text)` - Extract first email from text
- `toCamelCase(str)` / `toKebabCase(str)` / `toPascalCase(str)` / `toSnakeCase(str)` - Case conversion

#### Validation
- `isValidString(value)` - Comprehensive string validation
- `isEmail(value)` - Email address validation
- `isGuidFormat(str)` - GUID format validation
- `isValidArray(arr)` - Array validation with options
- `isNumber(value)` - Flexible number checking

#### Arrays & Objects
- `unique(array)` - Remove duplicates intelligently
- `getFirst(array)` / `getLast(array)` - Safe array access
- `copyObject(obj)` - Deep copy objects
- `cleanObject(obj)` - Remove undefined values
- `removeProperty(obj, key)` - Remove property recursively

#### File Operations
- `isFile(path)` / `isFolder(path)` - Path existence checking
- `readFile(path)` - Synchronous file reading
- `writeFile(path, content)` - Write with directory creation
- `loadJson(path)` / `saveJson(path, obj)` - JSON file operations

#### Date & Time
- `addDays(date, days)` / `addMonths(date, months)` / `addYears(date, years)` - Date arithmetic
- `toEpoch(date)` / `fromEpoch(timestamp)` - Unix timestamp conversion
- `getDuration(start, end)` - Calculate time duration

#### ID Generation
- `newGuid()` - Generate UUID v4
- `newUid()` - Generate 32-character UID
- `newCode(length, chars)` - Generate random codes

### Aliases for Convenience

Many functions have shorter aliases for convenience:
- `_` - The default export containing all functions
- `first` → `getFirst`
- `last` → `getLast`
- `copy` → `copyObject`
- `count` → `getArrayCount`
- `isCaps` → `isUpperCase`

## JavaScript Compatibility

While this is a TypeScript-first library, it's fully compatible with JavaScript projects:

- **CommonJS**: Works with `require()` in Node.js
- **ESM**: Works with `import` in modern JavaScript
- **No TypeScript Required**: JavaScript projects can use it without any TypeScript setup
- **Optional Types**: TypeScript definitions are included but not required

## Quick Examples

```javascript
// Clean and validate data
const email = _.getEmail('Contact: john@example.com'); // 'john@example.com'
if (_.isEmail(email)) {
  console.log('Valid email:', email);
}

// Work with arrays
const numbers = [1, 2, 2, 3, 3, 3];
const unique = _.unique(numbers); // [1, 2, 3]
const max = _.getMax(numbers); // 3
const sorted = _.sort(numbers); // [1, 2, 3]

// File operations
if (_.isFile('./config.json')) {
  const config = _.loadJson('./config.json');
  config.updated = _.now();
  _.saveJson('./config.json', config);
}

// Generate IDs
const userId = _.newGuid(); // '550e8400-e29b-41d4-a716-446655440000'
const sessionId = _.newUid(); // 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6'

// Date manipulation
const tomorrow = _.addDays(new Date(), 1);
const nextMonth = _.addMonths(new Date(), 1);
const timestamp = _.toEpoch(new Date());

// HTTP requests (async)
const data = await _.doGet('https://api.example.com/users');
const result = await _.doPost('https://api.example.com/users', {
  name: 'John Doe'
});
```

## Development Status

✅ **COMPLETE** - All 203 functions from the original `cleaner-node` package have been successfully implemented in TypeScript with:
- Full type definitions
- JSDoc documentation
- Dual CJS/ESM builds
- 100% API compatibility

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```bash
# Clone the repository
git clone https://github.com/FredLackey/cleaner-node-ts.git
cd cleaner-node-ts

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run linting
npm run lint
```

## License

Apache-2.0 - see [LICENSE](./LICENSE) file for details.

## Author

**Fred Lackey**  
[fred.lackey@gmail.com](mailto:fred.lackey@gmail.com)  
[http://fredlackey.com](http://fredlackey.com)  

---

**Links:**
- [Original cleaner-node](https://github.com/FredLackey/cleaner-node) - The JavaScript version
- [GitHub Repository](https://github.com/FredLackey/cleaner-node-ts) - This TypeScript port
- [NPM Package](https://www.npmjs.com/package/cleaner-node-ts)
- [Issue Tracker](https://github.com/FredLackey/cleaner-node-ts/issues)