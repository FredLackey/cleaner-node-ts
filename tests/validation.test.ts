import _ from '../src/index';

describe('Validation Functions', () => {
  describe('Type Checks', () => {
    describe('isBoolean', () => {
      it('should return true for boolean values', () => {
        expect(_.isBoolean(true)).toBe(true);
        expect(_.isBoolean(false)).toBe(true);
      });

      it('should return false for non-boolean values', () => {
        expect(_.isBoolean(1)).toBe(false);
        expect(_.isBoolean('true')).toBe(false);
        expect(_.isBoolean(null)).toBe(false);
        expect(_.isBoolean(undefined)).toBe(false);
      });
    });

    describe('isNumber', () => {
      it('should return true for valid numbers', () => {
        expect(_.isNumber(42)).toBe(true);
        expect(_.isNumber(3.14)).toBe(true);
        expect(_.isNumber(-10)).toBe(true);
        expect(_.isNumber(0)).toBe(true);
        expect(_.isNumber('42')).toBe(true);
        expect(_.isNumber(' 3.14 ')).toBe(true);
      });

      it('should return false for non-numeric values', () => {
        expect(_.isNumber('abc')).toBe(false);
        expect(_.isNumber(NaN)).toBe(false);
        expect(_.isNumber(Infinity)).toBe(false);
        expect(_.isNumber(null)).toBe(false);
        expect(_.isNumber(undefined)).toBe(false);
        expect(_.isNumber('')).toBe(false);
      });
    });

    describe('isArray', () => {
      it('should return true for arrays', () => {
        expect(_.isArray([])).toBe(true);
        expect(_.isArray([1, 2, 3])).toBe(true);
        expect(_.isArray(['a', 'b', 'c'])).toBe(true);
        expect(_.isArray([null, undefined])).toBe(true);
        expect(_.isArray([])).toBe(true);
        expect(_.isArray(Array.from('abc'))).toBe(true);
      });

      it('should return false for non-arrays', () => {
        expect(_.isArray(null)).toBe(false);
        expect(_.isArray(undefined)).toBe(false);
        expect(_.isArray({})).toBe(false);
        expect(_.isArray('array')).toBe(false);
        expect(_.isArray(123)).toBe(false);
        expect(_.isArray(true)).toBe(false);
        expect(_.isArray(new Date())).toBe(false);
        expect(_.isArray(/regex/)).toBe(false);
      });
    });

    describe('isObject', () => {
      it('should return true for plain objects', () => {
        expect(_.isObject({})).toBe(true);
        expect(_.isObject({ key: 'value' })).toBe(true);
      });

      it('should return false for non-objects', () => {
        expect(_.isObject(null)).toBe(false);
        expect(_.isObject([])).toBe(false);
        expect(_.isObject(new Date())).toBe(false);
        expect(_.isObject(/regex/)).toBe(false);
        expect(_.isObject('string')).toBe(false);
        expect(_.isObject(42)).toBe(false);
      });
    });

    describe('isDate', () => {
      it('should return true for valid Date objects', () => {
        expect(_.isDate(new Date())).toBe(true);
        expect(_.isDate(new Date('2023-01-01'))).toBe(true);
      });

      it('should return false for invalid dates', () => {
        expect(_.isDate(new Date('invalid'))).toBe(false);
        expect(_.isDate('2023-01-01')).toBe(false);
        expect(_.isDate(null)).toBe(false);
        expect(_.isDate(42)).toBe(false);
      });
    });
  });

  describe('Format Checks', () => {
    describe('isEmail', () => {
      it('should validate correct email addresses', () => {
        expect(_.isEmail('user@example.com')).toBe(true);
        expect(_.isEmail('john.doe@company.org')).toBe(true);
        expect(_.isEmail('test+tag@example.co.uk')).toBe(true);
      });

      it('should reject invalid email addresses', () => {
        expect(_.isEmail('invalid')).toBe(false);
        expect(_.isEmail('@example.com')).toBe(false);
        expect(_.isEmail('user@')).toBe(false);
        expect(_.isEmail('user@.com')).toBe(false);
        expect(_.isEmail(null)).toBe(false);
        expect(_.isEmail(123)).toBe(false);
      });
    });

    describe('isUrl', () => {
      it('should validate correct URLs', () => {
        expect(_.isUrl('http://example.com')).toBe(true);
        expect(_.isUrl('https://www.example.com')).toBe(true);
        expect(_.isUrl('https://example.com/path?query=value')).toBe(true);
      });

      it('should reject invalid URLs', () => {
        expect(_.isUrl('not-a-url')).toBe(false);
        expect(_.isUrl('ftp://example.com')).toBe(false);
        expect(_.isUrl('//example.com')).toBe(false);
        expect(_.isUrl('')).toBe(false);
        expect(_.isUrl(null)).toBe(false);
      });
    });

    describe('isGuidFormat', () => {
      it('should validate correct GUID formats', () => {
        expect(_.isGuidFormat('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
        expect(_.isGuidFormat('550E8400-E29B-41D4-A716-446655440000')).toBe(true);
      });

      it('should reject invalid GUID formats', () => {
        expect(_.isGuidFormat('550e8400-e29b-41d4-a716')).toBe(false);
        expect(_.isGuidFormat('not-a-guid')).toBe(false);
        expect(_.isGuidFormat('')).toBe(false);
        expect(_.isGuidFormat(null)).toBe(false);
      });
    });

    describe('isCamelCase', () => {
      it('should validate camelCase strings', () => {
        expect(_.isCamelCase('camelCase')).toBe(true);
        expect(_.isCamelCase('myVariableName')).toBe(true);
        expect(_.isCamelCase('toLowerCase')).toBe(true);
      });

      it('should reject non-camelCase strings', () => {
        expect(_.isCamelCase('PascalCase')).toBe(false);
        expect(_.isCamelCase('snake_case')).toBe(false);
        expect(_.isCamelCase('kebab-case')).toBe(false);
        expect(_.isCamelCase('UPPERCASE')).toBe(false);
        expect(_.isCamelCase('')).toBe(false);
      });
    });
  });

  describe('Value Checks', () => {
    describe('isValidString', () => {
      it('should validate non-empty strings', () => {
        expect(_.isValidString('hello')).toBe(true);
        expect(_.isValidString('  hello  ')).toBe(true);
      });

      it('should handle empty strings based on checkTrimmed parameter', () => {
        expect(_.isValidString('')).toBe(false);
        expect(_.isValidString('   ')).toBe(false);
        expect(_.isValidString('', false)).toBe(true);
        expect(_.isValidString('   ', false)).toBe(true);
      });

      it('should reject non-string values', () => {
        expect(_.isValidString(null)).toBe(false);
        expect(_.isValidString(undefined)).toBe(false);
        expect(_.isValidString(42)).toBe(false);
        expect(_.isValidString([])).toBe(false);
      });
    });

    describe('isValidArray', () => {
      it('should validate arrays', () => {
        expect(_.isValidArray([])).toBe(true);
        expect(_.isValidArray([1, 2, 3])).toBe(true);
      });

      it('should handle non-empty check', () => {
        expect(_.isValidArray([], true)).toBe(false);
        expect(_.isValidArray([1], true)).toBe(true);
      });

      it('should reject non-array values', () => {
        expect(_.isValidArray(null)).toBe(false);
        expect(_.isValidArray('array')).toBe(false);
        expect(_.isValidArray({})).toBe(false);
      });
    });

    describe('isValidObject', () => {
      it('should validate non-empty objects', () => {
        expect(_.isValidObject({ key: 'value' })).toBe(true);
      });

      it('should reject empty objects', () => {
        expect(_.isValidObject({})).toBe(false);
      });

      it('should reject non-objects', () => {
        expect(_.isValidObject(null)).toBe(false);
        expect(_.isValidObject([])).toBe(false);
        expect(_.isValidObject('object')).toBe(false);
      });
    });

    describe('isMatch', () => {
      it('should compare strings with case sensitivity', () => {
        expect(_.isMatch('Hello', 'Hello')).toBe(true);
        expect(_.isMatch('Hello', 'hello')).toBe(false);
        expect(_.isMatch('Hello', 'Hello', true)).toBe(true);
        expect(_.isMatch('Hello', 'hello', false)).toBe(true);
      });

      it('should handle trimming', () => {
        expect(_.isMatch('  Hello  ', 'Hello')).toBe(true);
        expect(_.isMatch('  Hello  ', '  Hello  ', true, false)).toBe(true);
      });
    });
  });
});
