import _ from '../src/index';

describe('String Functions', () => {
  describe('String Cleaning', () => {
    describe('cleanString', () => {
      it('should clean strings with valid characters', () => {
        expect(_.cleanString('Hello123!', _.ALPHANUMERIC)).toBe('Hello123');
        expect(_.cleanString('Test@#123', _.ALPHA)).toBe('Test');
        expect(_.cleanString('Test@#123', _.DIGITS)).toBe('123');
      });

      it('should remove invalid characters', () => {
        expect(_.cleanString('Hello123!', undefined, '!')).toBe('Hello123');
        expect(_.cleanString('a-b-c-d', undefined, '-')).toBe('abcd');
      });

      it('should handle undefined input', () => {
        expect(_.cleanString(null)).toBe(undefined);
        expect(_.cleanString(undefined)).toBe(undefined);
        expect(_.cleanString(123)).toBe(undefined);
      });
    });

    describe('cleanAlphanumeric', () => {
      it('should keep only alphanumeric characters', () => {
        expect(_.cleanAlphanumeric('Hello@123!')).toBe('Hello123');
        expect(_.cleanAlphanumeric('Test-Case_2023')).toBe('TestCase2023');
      });
    });

    describe('cleanDigits', () => {
      it('should keep only digits', () => {
        expect(_.cleanDigits('Phone: 555-1234')).toBe('5551234');
        expect(_.cleanDigits('abc123def456')).toBe('123456');
      });
    });

    describe('trim functions', () => {
      it('should trim strings', () => {
        expect(_.trimString('  hello  ')).toBe('hello');
        expect(_.trimString('\t\ntest\r\n')).toBe('test');
      });

      it('should trimToNull correctly', () => {
        expect(_.trimToNull('  hello  ')).toBe('hello');
        expect(_.trimToNull('   ')).toBe(null);
        expect(_.trimToNull('')).toBe(null);
        expect(_.trimToNull(null)).toBe(null);
      });

      it('should trimToUndefined correctly', () => {
        expect(_.trimToUndefined('  hello  ')).toBe('hello');
        expect(_.trimToUndefined('   ')).toBe(undefined);
        expect(_.trimToUndefined('')).toBe(undefined);
        expect(_.trimToUndefined(null)).toBe(undefined);
      });
    });

    describe('trimBrackets', () => {
      it('should remove matching bracket pairs', () => {
        expect(_.trimBrackets('(hello)')).toBe('hello');
        expect(_.trimBrackets('[hello]')).toBe('hello');
        expect(_.trimBrackets('{hello}')).toBe('hello');
      });

      it('should remove multiple nested bracket pairs', () => {
        expect(_.trimBrackets('((hello))')).toBe('hello');
        expect(_.trimBrackets('[{hello}]')).toBe('hello');
        expect(_.trimBrackets('({[hello]})')).toBe('hello');
      });

      it('should not remove non-matching brackets', () => {
        expect(_.trimBrackets('(hello]')).toBe('(hello]');
        expect(_.trimBrackets('[hello)')).toBe('[hello)');
        expect(_.trimBrackets('{hello]')).toBe('{hello]');
      });

      it('should handle empty brackets', () => {
        expect(_.trimBrackets('()')).toBe('');
        expect(_.trimBrackets('[]')).toBe('');
        expect(_.trimBrackets('{}')).toBe('');
        expect(_.trimBrackets('(())')).toBe('');
      });

      it('should handle strings without brackets', () => {
        expect(_.trimBrackets('hello')).toBe('hello');
        expect(_.trimBrackets('hello world')).toBe('hello world');
      });

      it('should handle invalid input', () => {
        expect(_.trimBrackets(null)).toBe(undefined);
        expect(_.trimBrackets(undefined)).toBe(undefined);
        expect(_.trimBrackets(123)).toBe(undefined);
      });

      it('should preserve inner brackets', () => {
        expect(_.trimBrackets('(hello (world))')).toBe('hello (world)');
        expect(_.trimBrackets('[array[0]]')).toBe('array[0]');
      });
    });
  });

  describe('String Transformation', () => {
    describe('case conversions', () => {
      it('should convert to camelCase', () => {
        expect(_.toCamelCase('hello world')).toBe('helloWorld');
        expect(_.toCamelCase('HELLO_WORLD')).toBe('helloWorld');
        expect(_.toCamelCase('kebab-case-string')).toBe('kebabCaseString');
      });

      it('should convert to PascalCase', () => {
        expect(_.toPascalCase('hello world')).toBe('HelloWorld');
        expect(_.toPascalCase('hello_world')).toBe('HelloWorld');
        expect(_.toPascalCase('kebab-case')).toBe('KebabCase');
      });

      it('should convert to snake_case', () => {
        expect(_.toSnakeCase('helloWorld')).toBe('hello_world');
        expect(_.toSnakeCase('HelloWorld')).toBe('hello_world');
        expect(_.toSnakeCase('hello world')).toBe('hello_world');
      });

      it('should convert to kebab-case', () => {
        expect(_.toKebabCase('helloWorld')).toBe('hello-world');
        expect(_.toKebabCase('HelloWorld')).toBe('hello-world');
        expect(_.toKebabCase('hello world')).toBe('hello-world');
      });
    });

    describe('unquote', () => {
      it('should remove surrounding quotes', () => {
        expect(_.unquote('"hello"')).toBe('hello');
        expect(_.unquote('hello')).toBe('hello');
        expect(_.unquote('""')).toBe('');
        expect(_.unquote('"hello')).toBe('"hello');
      });
    });

    describe('toBoolean', () => {
      it('should convert to boolean', () => {
        expect(_.toBoolean(true)).toBe(true);
        expect(_.toBoolean(false)).toBe(false);
        expect(_.toBoolean('true')).toBe(true);
        expect(_.toBoolean('false')).toBe(false);
        expect(_.toBoolean('yes')).toBe(true);
        expect(_.toBoolean('no')).toBe(false);
        expect(_.toBoolean(1)).toBe(true);
        expect(_.toBoolean(0)).toBe(false);
        expect(_.toBoolean('invalid')).toBe(undefined);
      });
    });
  });

  describe('String Extraction', () => {
    describe('getEmail', () => {
      it('should extract first email from text', () => {
        expect(_.getEmail('Contact us at support@example.com')).toBe('support@example.com');
        expect(_.getEmail('john@example.com and jane@example.org')).toBe('john@example.com');
        expect(_.getEmail('No email here')).toBe(undefined);
      });
    });

    describe('getEmails', () => {
      it('should extract all emails from text', () => {
        const text = 'Contact john@example.com or jane@example.org';
        expect(_.getEmails(text)).toEqual(['john@example.com', 'jane@example.org']);
        expect(_.getEmails('No emails')).toEqual([]);
      });
    });

    describe('getPadPrefix and getPadSuffix', () => {
      it('should get padding', () => {
        expect(_.getPadPrefix('  hello')).toBe('  ');
        expect(_.getPadSuffix('hello  ')).toBe('  ');
        expect(_.getPads('  hello  ')).toEqual({ prefix: 2, suffix: 2 });
      });
    });

    describe('hasString', () => {
      it('should check for substring', () => {
        expect(_.hasString('hello world', 'world')).toBe(true);
        expect(_.hasString('hello world', 'World')).toBe(false);
        expect(_.hasString('hello world', 'World', false)).toBe(true);
      });
    });

    describe('removePrefix and removeSuffix', () => {
      it('should remove prefix', () => {
        expect(_.removePrefix('hello world', 'hello ')).toBe('world');
        expect(_.removePrefix('testtestvalue', 'test', true)).toBe('value');
      });

      it('should remove suffix', () => {
        expect(_.removeSuffix('hello.txt', '.txt')).toBe('hello');
        expect(_.removeSuffix('file.txt.txt.txt', '.txt', true)).toBe('file');
      });
    });

    describe('splitFirst', () => {
      it('should split at first occurrence', () => {
        expect(_.splitFirst('a-b-c', '-')).toEqual(['a', 'b-c']);
        expect(_.splitFirst('hello', '-')).toEqual(['hello', '']);
      });
    });

    describe('undouble', () => {
      it('should remove consecutive occurrences', () => {
        expect(_.undouble('hello    world', ' ')).toBe('hello world');
        expect(_.undouble('a---b---c', '-')).toBe('a-b-c');
      });
    });
  });
});
