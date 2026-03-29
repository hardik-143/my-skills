import { SanityFieldConfig, SanitySchemaType } from '../../sanity-core/types';
import { getCapabilities } from '../capabilities';

/**
 * Define a field in a version-agnostic way.
 * Uses defineField() when available (v3+), falls back to raw config (v2).
 */
export function defineFieldCompat(config: SanityFieldConfig): SanityFieldConfig {
  const caps = getCapabilities();
  if (caps.hasDefineField) {
    try {
      const { defineField } = require('sanity');
      return defineField(config as Parameters<typeof defineField>[0]);
    } catch {
      // Fall through to return raw config
    }
  }
  return config;
}

/**
 * Define a schema type in a version-agnostic way.
 * Uses defineType() when available (v3+), falls back to raw config (v2).
 */
export function defineTypeCompat(config: SanitySchemaType): SanitySchemaType {
  const caps = getCapabilities();
  if (caps.hasDefineType) {
    try {
      const { defineType } = require('sanity');
      return defineType(config as Parameters<typeof defineType>[0]);
    } catch {
      // Fall through
    }
  }
  return config;
}

/**
 * Create an array of fields with compatibility wrappers applied.
 */
export function defineFieldsCompat(fields: SanityFieldConfig[]): SanityFieldConfig[] {
  return fields.map(defineFieldCompat);
}

/**
 * Create an object schema type with all the compatibility wrappers.
 */
export function createObjectType(
  name: string,
  title: string,
  fields: SanityFieldConfig[],
  options?: Partial<SanitySchemaType>
): SanitySchemaType {
  return defineTypeCompat({
    name,
    title,
    type: 'object',
    fields: defineFieldsCompat(fields),
    ...options,
  });
}

/**
 * Create a document schema type with compatibility wrappers.
 */
export function createDocumentType(
  name: string,
  title: string,
  fields: SanityFieldConfig[],
  options?: Partial<SanitySchemaType>
): SanitySchemaType {
  return defineTypeCompat({
    name,
    title,
    type: 'document',
    fields: defineFieldsCompat(fields),
    ...options,
  });
}
