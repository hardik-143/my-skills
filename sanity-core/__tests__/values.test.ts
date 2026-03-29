import { getValue, setValue, deleteValue, hasValue, mergeValues } from '../values';

describe('values', () => {
  describe('getValue', () => {
    it('gets a top-level value', () => {
      expect(getValue({ name: 'John' }, 'name')).toBe('John');
    });

    it('gets a nested value', () => {
      expect(getValue({ user: { name: 'John' } }, 'user.name')).toBe('John');
    });

    it('returns undefined for missing paths', () => {
      expect(getValue({ name: 'John' }, 'age')).toBeUndefined();
    });

    it('returns undefined for deeply missing paths', () => {
      expect(getValue({ a: { b: 1 } }, 'a.c.d')).toBeUndefined();
    });

    it('returns undefined for undefined input', () => {
      expect(getValue(undefined, 'name')).toBeUndefined();
    });
  });

  describe('setValue', () => {
    it('sets a top-level value immutably', () => {
      const original = { name: 'John' };
      const result = setValue(original, 'name', 'Jane');
      expect(result.name).toBe('Jane');
      expect(original.name).toBe('John');
    });

    it('sets a nested value', () => {
      const obj = { user: { name: 'John' } };
      const result = setValue(obj, 'user.name', 'Jane');
      expect((result.user as Record<string, unknown>).name).toBe('Jane');
    });

    it('creates intermediate objects', () => {
      const obj = {};
      const result = setValue(obj as Record<string, unknown>, 'a.b.c', 42);
      expect((result as any).a.b.c).toBe(42);
    });
  });

  describe('deleteValue', () => {
    it('deletes a top-level key', () => {
      const obj = { a: 1, b: 2 };
      const result = deleteValue(obj, 'a');
      expect(result.a).toBeUndefined();
      expect(result.b).toBe(2);
    });

    it('deletes a nested key', () => {
      const obj = { user: { name: 'John', age: 30 } };
      const result = deleteValue(obj, 'user.age');
      expect((result.user as any).name).toBe('John');
      expect((result.user as any).age).toBeUndefined();
    });
  });

  describe('hasValue', () => {
    it('returns true for existing paths', () => {
      expect(hasValue({ a: 1 }, 'a')).toBe(true);
    });

    it('returns false for missing paths', () => {
      expect(hasValue({ a: 1 }, 'b')).toBe(false);
    });
  });

  describe('mergeValues', () => {
    it('merges flat objects', () => {
      expect(mergeValues({ a: 1 } as Record<string, unknown>, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it('deep merges nested objects', () => {
      const result = mergeValues(
        { user: { name: 'John', age: 30 } } as Record<string, unknown>,
        { user: { age: 31 } }
      );
      expect(result).toEqual({ user: { name: 'John', age: 31 } });
    });

    it('overwrites arrays', () => {
      const result = mergeValues({ tags: [1, 2] }, { tags: [3] });
      expect(result.tags).toEqual([3]);
    });
  });
});
