import { defineFieldCompat, defineTypeCompat, defineFieldsCompat, createObjectType, createDocumentType } from '../schema';
import { resetCapabilities, setCapabilities } from '../capabilities';

describe('schema adapters', () => {
  beforeEach(() => {
    resetCapabilities();
  });

  describe('defineFieldCompat', () => {
    it('returns the config directly when defineField is not available', () => {
      const config = { name: 'title', type: 'string', title: 'Title' };
      const result = defineFieldCompat(config);
      expect(result).toEqual(config);
    });
  });

  describe('defineTypeCompat', () => {
    it('returns the config directly when defineType is not available', () => {
      const config = { name: 'post', type: 'document', title: 'Post' };
      const result = defineTypeCompat(config);
      expect(result).toEqual(config);
    });
  });

  describe('defineFieldsCompat', () => {
    it('wraps each field', () => {
      const fields = [
        { name: 'title', type: 'string' },
        { name: 'body', type: 'text' },
      ];
      const result = defineFieldsCompat(fields);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('title');
      expect(result[1].name).toBe('body');
    });
  });

  describe('createObjectType', () => {
    it('creates an object type with fields', () => {
      const result = createObjectType('seo', 'SEO', [
        { name: 'title', type: 'string' },
      ]);
      expect(result.name).toBe('seo');
      expect(result.type).toBe('object');
      expect(result.fields).toHaveLength(1);
    });
  });

  describe('createDocumentType', () => {
    it('creates a document type with fields', () => {
      const result = createDocumentType('post', 'Post', [
        { name: 'title', type: 'string' },
        { name: 'body', type: 'text' },
      ]);
      expect(result.name).toBe('post');
      expect(result.type).toBe('document');
      expect(result.fields).toHaveLength(2);
    });
  });
});
