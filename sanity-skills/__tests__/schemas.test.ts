import { createSeoField, createSlugField, createImageField, createRichTextField, createBlogPostType, createAuthorType } from '../schemas';
import { resetCapabilities } from '../../sanity-adapters/capabilities';

describe('schema creators', () => {
  beforeEach(() => {
    resetCapabilities();
  });

  describe('createSeoField', () => {
    it('creates an SEO object field', () => {
      const field = createSeoField();
      expect(field.name).toBe('seo');
      expect(field.type).toBe('object');
      expect(field.fields).toHaveLength(2);
    });

    it('accepts custom options', () => {
      const field = createSeoField({ name: 'meta', title: 'Meta Tags' });
      expect(field.name).toBe('meta');
      expect(field.title).toBe('Meta Tags');
    });
  });

  describe('createSlugField', () => {
    it('creates a slug field', () => {
      const field = createSlugField();
      expect(field.name).toBe('slug');
      expect(field.type).toBe('slug');
    });

    it('accepts custom source', () => {
      const field = createSlugField({ source: 'name' });
      expect(field.options?.source).toBe('name');
    });
  });

  describe('createImageField', () => {
    it('creates an image field with hotspot', () => {
      const field = createImageField();
      expect(field.name).toBe('image');
      expect(field.type).toBe('image');
      expect(field.options?.hotspot).toBe(true);
      expect(field.fields).toHaveLength(2);
    });
  });

  describe('createRichTextField', () => {
    it('creates an array field for rich text', () => {
      const field = createRichTextField();
      expect(field.name).toBe('body');
      expect(field.type).toBe('array');
      expect(field.of).toBeDefined();
    });
  });

  describe('createBlogPostType', () => {
    it('creates a complete blog post document type', () => {
      const type = createBlogPostType();
      expect(type.name).toBe('post');
      expect(type.type).toBe('document');
      expect(type.fields!.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('createAuthorType', () => {
    it('creates an author document type', () => {
      const type = createAuthorType();
      expect(type.name).toBe('author');
      expect(type.type).toBe('document');
      expect(type.fields!.length).toBe(4);
    });
  });
});
