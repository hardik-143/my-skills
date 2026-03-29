import { paginatedQuery, queryBySlug, queryById, queryRelated, searchQuery, expandReference } from '../groq';

describe('groq utilities', () => {
  describe('paginatedQuery', () => {
    it('builds a basic paginated query', () => {
      const q = paginatedQuery('post');
      expect(q).toContain('_type == "post"');
      expect(q).toContain('[0...10]');
    });

    it('builds with custom options', () => {
      const q = paginatedQuery('post', {
        orderBy: '_createdAt',
        order: 'desc',
        offset: 10,
        limit: 5,
      });
      expect(q).toContain('order(_createdAt desc)');
      expect(q).toContain('[10...15]');
    });
  });

  describe('queryBySlug', () => {
    it('builds a slug query', () => {
      const q = queryBySlug('post', 'hello-world');
      expect(q).toContain('_type == "post"');
      expect(q).toContain('slug.current == "hello-world"');
      expect(q).toContain('[0]');
    });
  });

  describe('queryById', () => {
    it('builds an ID query', () => {
      const q = queryById('abc123');
      expect(q).toContain('_id == "abc123"');
      expect(q).toContain('[0]');
    });
  });

  describe('queryRelated', () => {
    it('builds a related documents query', () => {
      const q = queryRelated('post', 'author', 'author-1');
      expect(q).toContain('_type == "post"');
      expect(q).toContain('author._ref == "author-1"');
    });
  });

  describe('searchQuery', () => {
    it('builds a search query', () => {
      const q = searchQuery('post', 'react', ['title', 'body']);
      expect(q).toContain('title match "*react*"');
      expect(q).toContain('body match "*react*"');
    });
  });

  describe('expandReference', () => {
    it('expands a reference', () => {
      expect(expandReference('author')).toBe('author->{...}');
    });

    it('expands with projection', () => {
      expect(expandReference('author', ['name', 'bio'])).toBe('author->{{ name, bio }}');
    });
  });
});
