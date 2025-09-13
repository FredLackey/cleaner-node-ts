import _ from '../src/index';

describe('Object Functions', () => {
  describe('Copy Functions', () => {
    describe('copyObject/copy', () => {
      it('should deep copy objects', () => {
        const original = { a: 1, b: { c: 2 } };
        const copy = _.copyObject(original);
        expect(copy).toEqual(original);
        expect(copy).not.toBe(original);
        expect(copy?.b).not.toBe(original.b);
      });

      it('should copy arrays', () => {
        const original = [1, 2, { a: 3 }];
        const copy = _.copy(original);
        expect(copy).toEqual(original);
        expect(copy).not.toBe(original);
      });

      it('should handle dates', () => {
        const date = new Date('2023-01-01');
        const copy = _.copyObject(date);
        expect(copy).toEqual(date);
        expect(copy).not.toBe(date);
      });

      it('should return null for null/undefined', () => {
        expect(_.copyObject(null)).toBe(null);
        expect(_.copyObject(undefined)).toBe(null);
      });
    });
  });

  describe('Clean Functions', () => {
    describe('cleanObject', () => {
      it('should remove undefined values', () => {
        const obj = { a: 1, b: undefined, c: 3 };
        expect(_.cleanObject(obj)).toEqual({ a: 1, c: 3 });
      });

      it('should clean nested objects', () => {
        const obj = { a: 1, b: { c: undefined, d: 2 } };
        expect(_.cleanObject(obj)).toEqual({ a: 1, b: { d: 2 } });
      });

      it('should clean arrays', () => {
        const arr = [1, { a: undefined, b: 2 }, 3];
        expect(_.cleanObject(arr)).toEqual([1, { b: 2 }, 3]);
      });
    });

    describe('removeAuditFields', () => {
      it('should remove audit fields', () => {
        const obj = {
          id: 1,
          name: 'Test',
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
        };
        const cleaned = _.removeAuditFields(obj);
        expect(cleaned).toEqual({ id: 1, name: 'Test' });
      });
    });

    describe('removeProperty', () => {
      it('should remove specified property', () => {
        const obj = { a: 1, b: 2, c: { b: 3, d: 4 } };
        expect(_.removeProperty(obj, 'b')).toEqual({ a: 1, c: { d: 4 } });
      });
    });

    describe('removeDeleted', () => {
      it('should remove deleted items', () => {
        const data = [
          { id: 1, name: 'Active' },
          { id: 2, name: 'Deleted', deleted: true },
          { id: 3, name: 'Also Active' },
        ];
        expect(_.removeDeleted(data)).toEqual([
          { id: 1, name: 'Active' },
          { id: 3, name: 'Also Active' },
        ]);
      });
    });

    describe('cleanDto', () => {
      it('should clean DTO objects', () => {
        const dto = {
          _id: '123',
          name: 'Test',
          value: null,
          createdAt: new Date(),
          __v: 0,
        };
        const cleaned = _.cleanDto(dto);
        expect(cleaned).toHaveProperty('id', '123');
        expect(cleaned).not.toHaveProperty('_id');
        expect(cleaned).not.toHaveProperty('createdAt');
        expect(cleaned).not.toHaveProperty('__v');
        expect(cleaned).not.toHaveProperty('value');
      });
    });
  });

  describe('Extract Functions', () => {
    describe('getId/getIds', () => {
      it('should extract id from object', () => {
        expect(_.getId({ id: 123 })).toBe(123);
        expect(_.getId({ _id: '456' })).toBe('456');
        expect(_.getId('789')).toBe('789');
      });

      it('should extract multiple ids', () => {
        const items = [{ id: 1 }, { _id: 2 }, 3, null, { name: 'no id' }];
        expect(_.getIds(items)).toEqual([1, 2, 3]);
      });
    });

    describe('getUid/getUids', () => {
      it('should extract UID from object', () => {
        const guid = '550e8400-e29b-41d4-a716-446655440000';
        expect(_.getUid({ uid: guid })).toBe(guid);
        expect(_.getUid(guid)).toBe(guid);
      });

      it('should extract multiple UIDs', () => {
        const uid1 = '550e8400-e29b-41d4-a716-446655440000';
        const uid2 = 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6';
        const items = [{ uuid: uid1 }, uid2, { id: 'not-a-uid' }];
        expect(_.getUids(items)).toEqual([uid1, uid2]);
      });
    });

    describe('findAllUids', () => {
      it('should find all UIDs in nested structure', () => {
        const data = {
          id: '550e8400-e29b-41d4-a716-446655440000',
          nested: {
            items: [{ uid: 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6' }, 'not-a-uid'],
          },
        };
        const uids = _.findAllUids(data);
        expect(uids).toHaveLength(2);
        expect(uids).toContain('550e8400-e29b-41d4-a716-446655440000');
        expect(uids).toContain('A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6');
      });
    });

    describe('fromResult', () => {
      it('should extract nested result', () => {
        const data = {
          result: {
            result: {
              result: 'final value',
            },
          },
        };
        expect(_.fromResult(data)).toBe('final value');
      });
    });
  });

  describe('Transform Functions', () => {
    describe('fromDto', () => {
      it('should convert string representations to types', () => {
        const dto = {
          date: '2023-01-01T00:00:00.000Z',
          bool: 'true',
          number: '42',
          text: 'hello',
        };
        const result = _.fromDto(dto);
        expect(result.date).toBeInstanceOf(Date);
        expect(result.bool).toBe(true);
        expect(result.number).toBe(42);
        expect(result.text).toBe('hello');
      });
    });

    describe('toRequest', () => {
      it('should transform request object', () => {
        const req = {
          method: 'POST',
          url: '/api/test',
          headers: { 'content-type': 'application/json' },
          body: { data: 'test' },
        };
        const result = _.toRequest(req);
        expect(result.method).toBe('POST');
        expect(result.url).toBe('/api/test');
        expect(result.headers).toEqual({ 'content-type': 'application/json' });
        expect(result.body).toEqual({ data: 'test' });
      });
    });

    describe('toResponse', () => {
      it('should format response', () => {
        const data = { id: 1, name: 'Test' };
        const response = _.toResponse(data);
        expect(response.success).toBe(true);
        expect(response.data).toEqual(data);
        expect(response.timestamp).toBeDefined();
      });

      it('should handle errors', () => {
        const error = new Error('Test error');
        const response = _.toResponse(null, error);
        expect(response.success).toBe(false);
        expect(response.error.message).toBe('Test error');
      });
    });

    describe('parseJson', () => {
      it('should parse valid JSON', () => {
        expect(_.parseJson('{"a": 1}')).toEqual({ a: 1 });
        expect(_.parseJson('[1, 2, 3]')).toEqual([1, 2, 3]);
      });

      it('should return null for invalid JSON', () => {
        expect(_.parseJson('not json')).toBe(null);
        expect(_.parseJson(null)).toBe(null);
      });
    });

    describe('hashObject', () => {
      it('should generate hash for objects', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2 };
        const obj3 = { a: 1, b: 3 };

        const hash1 = _.hashObject(obj1);
        const hash2 = _.hashObject(obj2);
        const hash3 = _.hashObject(obj3);

        expect(hash1).toBe(hash2);
        expect(hash1).not.toBe(hash3);
      });
    });
  });
});
