import { slugify, truncate, generateKey, isPlainObject, groqProjection, groqQuery } from '../utils';

describe('utils', () => {
  describe('slugify', () => {
    it('converts a string to a slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });

    it('trims leading and trailing dashes', () => {
      expect(slugify('  Hello World  ')).toBe('hello-world');
    });

    it('handles consecutive spaces and dashes', () => {
      expect(slugify('a  b---c')).toBe('a-b-c');
    });
  });

  describe('truncate', () => {
    it('does not truncate short strings', () => {
      expect(truncate('short', 10)).toBe('short');
    });

    it('truncates long strings with ellipsis', () => {
      const result = truncate('This is a very long string', 10);
      expect(result.length).toBe(10);
      expect(result.endsWith('…')).toBe(true);
    });
  });

  describe('generateKey', () => {
    it('generates unique keys', () => {
      const keys = new Set(Array.from({ length: 100 }, () => generateKey()));
      expect(keys.size).toBe(100);
    });
  });

  describe('isPlainObject', () => {
    it('returns true for plain objects', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
    });

    it('returns false for non-plain objects', () => {
      expect(isPlainObject(null)).toBe(false);
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject('string')).toBe(false);
      expect(isPlainObject(42)).toBe(false);
    });
  });

  describe('groqProjection', () => {
    it('creates a projection from fields', () => {
      expect(groqProjection(['title', 'slug'])).toBe('{ title, slug }');
    });
  });

  describe('groqQuery', () => {
    it('builds a basic query', () => {
      expect(groqQuery('post')).toBe('*[_type == "post"]');
    });

    it('builds a query with filter', () => {
      expect(groqQuery('post', 'published == true')).toBe('*[_type == "post" && published == true]');
    });

    it('builds a query with projection', () => {
      expect(groqQuery('post', undefined, ['title', 'body'])).toBe('*[_type == "post"] { title, body }');
    });
  });
});
