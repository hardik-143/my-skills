import { createValidation, validate, validationPresets } from '../validation';

describe('validation', () => {
  describe('createValidation', () => {
    it('creates required validation', () => {
      const rules = createValidation().required().build();
      expect(validate('', rules)).toEqual(['This field is required']);
      expect(validate('hello', rules)).toEqual([]);
    });

    it('creates min length validation', () => {
      const rules = createValidation().min(5).build();
      expect(validate('hi', rules)).toEqual(['Must be at least 5 characters']);
      expect(validate('hello world', rules)).toEqual([]);
    });

    it('creates max length validation', () => {
      const rules = createValidation().max(5).build();
      expect(validate('hello world', rules)).toEqual(['Must be at most 5 characters']);
      expect(validate('hi', rules)).toEqual([]);
    });

    it('chains multiple validations', () => {
      const rules = createValidation().required().min(3).max(10).build();
      expect(validate('', rules)).toContain('This field is required');
      expect(validate('hi', rules)).toContain('Must be at least 3 characters');
      expect(validate('this is too long', rules)).toContain('Must be at most 10 characters');
      expect(validate('perfect', rules)).toEqual([]);
    });

    it('creates regex validation', () => {
      const rules = createValidation().regex(/^[a-z]+$/).build();
      expect(validate('hello', rules)).toEqual([]);
      expect(validate('Hello', rules)).toEqual(['Invalid format']);
    });

    it('creates custom validation', () => {
      const rules = createValidation().custom((v) => {
        return v === 'valid' ? true : 'Must be "valid"';
      }).build();
      expect(validate('valid', rules)).toEqual([]);
      expect(validate('invalid', rules)).toEqual(['Must be "valid"']);
    });
  });

  describe('validationPresets', () => {
    it('seoTitle validates correctly', () => {
      const rules = validationPresets.seoTitle();
      expect(validate('', rules).length).toBeGreaterThan(0);
      expect(validate('Short', rules).length).toBeGreaterThan(0);
      expect(validate('A valid SEO title that meets the minimum', rules)).toEqual([]);
    });

    it('slug validates correctly', () => {
      const rules = validationPresets.slug();
      expect(validate('valid-slug', rules)).toEqual([]);
      expect(validate('Invalid Slug!', rules).length).toBeGreaterThan(0);
    });

    it('email validates correctly', () => {
      const rules = validationPresets.email();
      expect(validate('user@example.com', rules)).toEqual([]);
      expect(validate('not-an-email', rules).length).toBeGreaterThan(0);
    });
  });
});
