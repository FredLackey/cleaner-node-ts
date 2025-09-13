import _ from '../src/index';

describe('Array Functions', () => {
  describe('Unique Functions', () => {
    describe('unique', () => {
      it('should remove duplicate numbers', () => {
        expect(_.unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      });

      it('should remove duplicate strings', () => {
        expect(_.unique(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
      });

      it('should handle case-insensitive string deduplication', () => {
        expect(_.unique(['Hello', 'hello', 'HELLO'], { caseSensitive: false })).toEqual(['Hello']);
      });

      it('should remove duplicate objects', () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        expect(_.unique([obj1, obj2, obj1])).toEqual([obj1, obj2]);
      });

      it('should return null for non-arrays', () => {
        expect(_.unique('not an array')).toBe(null);
        expect(_.unique(null)).toBe(null);
      });
    });

    describe('uniqueNumbers', () => {
      it('should filter unique numbers', () => {
        expect(_.uniqueNumbers([1, 2, '2', 3, '3', 3])).toEqual([1, 2, 3]);
      });

      it('should handle non-numeric values', () => {
        expect(_.uniqueNumbers([1, 'abc', 2, null, 3])).toEqual([1, 2, 3]);
      });
    });

    describe('uniqueStrings', () => {
      it('should filter unique strings', () => {
        expect(_.uniqueStrings(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
      });

      it('should handle trimming', () => {
        expect(_.uniqueStrings(['  a  ', 'a', '  a'])).toEqual(['a']);
      });

      it('should handle case sensitivity', () => {
        expect(_.uniqueStrings(['A', 'a'], { caseSensitive: true })).toEqual(['A', 'a']);
        expect(_.uniqueStrings(['A', 'a'], { caseSensitive: false })).toEqual(['A']);
      });
    });
  });

  describe('Access Functions', () => {
    describe('getFirst/first', () => {
      it('should get first element of array', () => {
        expect(_.getFirst([1, 2, 3])).toBe(1);
        expect(_.first(['a', 'b', 'c'])).toBe('a');
      });

      it('should get first character of string', () => {
        expect(_.getFirst('hello')).toBe('h');
      });

      it('should return undefined for empty array', () => {
        expect(_.getFirst([])).toBe(undefined);
        expect(_.getFirst('')).toBe(undefined);
      });
    });

    describe('getLast/last', () => {
      it('should get last element of array', () => {
        expect(_.getLast([1, 2, 3])).toBe(3);
        expect(_.last(['a', 'b', 'c'])).toBe('c');
      });

      it('should get last character of string', () => {
        expect(_.getLast('hello')).toBe('o');
      });
    });

    describe('getSingle/single', () => {
      it('should return element if array has one item', () => {
        expect(_.getSingle([42])).toBe(42);
        expect(_.single(['only'])).toBe('only');
      });

      it('should return undefined for multiple or zero items', () => {
        expect(_.getSingle([1, 2])).toBe(undefined);
        expect(_.getSingle([])).toBe(undefined);
      });
    });

    describe('getArrayCount/count', () => {
      it('should return array length', () => {
        expect(_.getArrayCount([1, 2, 3])).toBe(3);
        expect(_.count([])).toBe(0);
      });

      it('should return 0 for non-arrays', () => {
        expect(_.getArrayCount('not array')).toBe(0);
        expect(_.getArrayCount(null)).toBe(0);
      });
    });

    describe('getMax/max and getMin/min', () => {
      it('should find max value', () => {
        expect(_.getMax([1, 5, 3, 2])).toBe(5);
        expect(_.max([-10, -5, -20])).toBe(-5);
      });

      it('should find min value', () => {
        expect(_.getMin([1, 5, 3, 2])).toBe(1);
        expect(_.min([-10, -5, -20])).toBe(-20);
      });

      it('should handle non-numeric values', () => {
        expect(_.getMax([1, 'abc', 3, null, 5])).toBe(5);
        expect(_.getMin([1, 'abc', 3, null, 5])).toBe(1);
      });
    });
  });

  describe('Transform Functions', () => {
    describe('sort/ascending/descending', () => {
      it('should sort numbers ascending', () => {
        expect(_.sort([3, 1, 2])).toEqual([1, 2, 3]);
        expect(_.ascending([3, 1, 2])).toEqual([1, 2, 3]);
      });

      it('should sort numbers descending', () => {
        expect(_.sort([3, 1, 2], true)).toEqual([3, 2, 1]);
        expect(_.descending([3, 1, 2])).toEqual([3, 2, 1]);
      });

      it('should filter non-numeric values', () => {
        expect(_.sort([3, 'abc', 1, null, 2])).toEqual([1, 2, 3]);
      });
    });

    describe('initArray', () => {
      it('should ensure value is array', () => {
        expect(_.initArray([1, 2, 3])).toEqual([1, 2, 3]);
        expect(_.initArray('single')).toEqual(['single']);
        expect(_.initArray(null)).toEqual([]);
      });

      it('should filter undefined values', () => {
        expect(_.initArray([1, undefined, 2, undefined, 3])).toEqual([1, 2, 3]);
      });
    });

    describe('trimArray', () => {
      it('should trim non-string elements from ends', () => {
        expect(_.trimArray([null, 'a', 'b', null])).toEqual(['a', 'b']);
        expect(_.trimArray([1, 2, 'hello', 'world', 3, 4])).toEqual(['hello', 'world']);
      });
    });

    describe('toColumn', () => {
      it('should format as padded column', () => {
        expect(_.toColumn(['a', 'bb', 'ccc'])).toEqual(['a  ', 'bb ', 'ccc']);
      });
    });

    describe('toTable', () => {
      it('should create text table', () => {
        const rows = ['Name\tAge', 'John\t30', 'Jane\t25'];
        const table = _.toTable(rows);
        expect(table).toContain('Name');
        expect(table).toContain('John');
        expect(table).toContain('+');
        expect(table).toContain('|');
      });
    });
  });
});
