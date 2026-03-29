export interface ValidationBuilder {
  required: (message?: string) => ValidationBuilder;
  min: (length: number, message?: string) => ValidationBuilder;
  max: (length: number, message?: string) => ValidationBuilder;
  regex: (pattern: RegExp, message?: string) => ValidationBuilder;
  custom: (fn: (value: unknown) => true | string) => ValidationBuilder;
  build: () => ValidationRule[];
}

interface ValidationRule {
  constraint?: unknown;
  flag?: string;
  message?: string;
  _type: string;
}

/**
 * Create a validation builder for fluid validation rules.
 */
export function createValidation(): ValidationBuilder {
  const rules: ValidationRule[] = [];

  const builder: ValidationBuilder = {
    required(message = 'This field is required') {
      rules.push({ _type: 'required', message });
      return builder;
    },
    min(length: number, message?: string) {
      rules.push({
        _type: 'min',
        constraint: length,
        message: message ?? `Must be at least ${length} characters`,
      });
      return builder;
    },
    max(length: number, message?: string) {
      rules.push({
        _type: 'max',
        constraint: length,
        message: message ?? `Must be at most ${length} characters`,
      });
      return builder;
    },
    regex(pattern: RegExp, message = 'Invalid format') {
      rules.push({ _type: 'regex', constraint: pattern.source, message });
      return builder;
    },
    custom(fn: (value: unknown) => true | string) {
      rules.push({ _type: 'custom', constraint: fn, message: undefined });
      return builder;
    },
    build() {
      return rules;
    },
  };

  return builder;
}

/**
 * Run validation rules against a value.
 * Returns an array of error messages, or empty array if valid.
 */
export function validate(value: unknown, rules: ValidationRule[]): string[] {
  const errors: string[] = [];

  for (const rule of rules) {
    switch (rule._type) {
      case 'required':
        if (value === undefined || value === null || value === '') {
          errors.push(rule.message ?? 'Required');
        }
        break;
      case 'min':
        if (typeof value === 'string' && typeof rule.constraint === 'number' && value.length < rule.constraint) {
          errors.push(rule.message ?? 'Too short');
        }
        break;
      case 'max':
        if (typeof value === 'string' && typeof rule.constraint === 'number' && value.length > rule.constraint) {
          errors.push(rule.message ?? 'Too long');
        }
        break;
      case 'regex':
        if (typeof value === 'string' && typeof rule.constraint === 'string') {
          const regex = new RegExp(rule.constraint);
          if (!regex.test(value)) {
            errors.push(rule.message ?? 'Invalid format');
          }
        }
        break;
      case 'custom':
        if (typeof rule.constraint === 'function') {
          const result = (rule.constraint as (value: unknown) => true | string)(value);
          if (result !== true) {
            errors.push(result);
          }
        }
        break;
    }
  }

  return errors;
}

/**
 * Common validation presets.
 */
export const validationPresets = {
  /** SEO title: required, 10-60 chars */
  seoTitle: () => createValidation().required().min(10).max(60).build(),

  /** SEO description: required, 50-160 chars */
  seoDescription: () => createValidation().required().min(50).max(160).build(),

  /** Slug: required, lowercase alphanumeric with dashes */
  slug: () => createValidation().required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and dashes').build(),

  /** Email */
  email: () => createValidation().required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Must be a valid email address').build(),

  /** URL */
  url: () => createValidation().required().regex(/^https?:\/\/[^\s]+$/, 'Must be a valid URL').build(),
};
