import _ from '../src/index';

describe('cleaner-node-ts basic setup', () => {
  describe('Constants', () => {
    it('should export ALPHANUMERIC constant', () => {
      expect(_.ALPHANUMERIC).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
    });

    it('should export ALPHA constant', () => {
      expect(_.ALPHA).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
    });

    it('should export DIGITS constant', () => {
      expect(_.DIGITS).toBe('0123456789');
    });
  });

  describe('Type guards', () => {
    it('should have isDefined function', () => {
      expect(typeof _.isDefined).toBe('function');
      expect(_.isDefined(undefined)).toBe(false);
      expect(_.isDefined(null)).toBe(true);
      expect(_.isDefined(0)).toBe(true);
      expect(_.isDefined('')).toBe(true);
    });

    it('should have isSet function', () => {
      expect(typeof _.isSet).toBe('function');
      expect(_.isSet(undefined)).toBe(false);
      expect(_.isSet(null)).toBe(false);
      expect(_.isSet(0)).toBe(true);
      expect(_.isSet('')).toBe(true);
    });

    it('should have isNotNull function', () => {
      expect(typeof _.isNotNull).toBe('function');
      expect(_.isNotNull(null)).toBe(false);
      expect(_.isNotNull(undefined)).toBe(true);
      expect(_.isNotNull(0)).toBe(true);
    });

    it('should have isNullOrUndefined function', () => {
      expect(typeof _.isNullOrUndefined).toBe('function');
      expect(_.isNullOrUndefined(null)).toBe(true);
      expect(_.isNullOrUndefined(undefined)).toBe(true);
      expect(_.isNullOrUndefined(0)).toBe(false);
      expect(_.isNullOrUndefined('')).toBe(false);
    });
  });

  describe('Placeholder functions', () => {
    it('should have placeholder for now() function', () => {
      expect(typeof _.now).toBe('function');
      const result = _.now();
      expect(result).toBeInstanceOf(Date);
    });

    it('should have placeholder string functions', () => {
      expect(typeof _.cleanString).toBe('function');
      expect(typeof _.trimString).toBe('function');
      expect(typeof _.trimToNull).toBe('function');
    });

    it('should have placeholder validation functions', () => {
      expect(typeof _.isValidString).toBe('function');
      expect(typeof _.isEmail).toBe('function');
      expect(typeof _.isUrl).toBe('function');
    });

    it('should have placeholder array functions', () => {
      expect(typeof _.unique).toBe('function');
      expect(typeof _.getFirst).toBe('function');
      expect(typeof _.getLast).toBe('function');
    });

    it('should have placeholder object functions', () => {
      expect(typeof _.copyObject).toBe('function');
      expect(typeof _.cleanObject).toBe('function');
    });
  });
});
