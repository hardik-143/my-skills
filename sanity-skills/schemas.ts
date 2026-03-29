import { SanityFieldConfig, SanitySchemaType } from '../sanity-core/types';
import { defineFieldCompat, defineFieldsCompat, createDocumentType } from '../sanity-adapters/schema';

/**
 * Create an SEO fields object type.
 * Compatible with all Sanity versions via adapters.
 */
export function createSeoField(options?: {
  name?: string;
  title?: string;
  titleMaxLength?: number;
  descriptionMaxLength?: number;
}): SanityFieldConfig {
  const name = options?.name ?? 'seo';
  const title = options?.title ?? 'SEO';

  return defineFieldCompat({
    name,
    title,
    type: 'object',
    fields: defineFieldsCompat([
      {
        name: 'title',
        title: 'Meta Title',
        type: 'string',
        description: `SEO title (recommended: max ${options?.titleMaxLength ?? 60} characters)`,
      },
      {
        name: 'description',
        title: 'Meta Description',
        type: 'text',
        description: `SEO description (recommended: max ${options?.descriptionMaxLength ?? 160} characters)`,
      },
    ]),
  });
}

/**
 * Create a slug field with source configuration.
 */
export function createSlugField(options?: {
  name?: string;
  title?: string;
  source?: string;
  maxLength?: number;
}): SanityFieldConfig {
  return defineFieldCompat({
    name: options?.name ?? 'slug',
    title: options?.title ?? 'Slug',
    type: 'slug',
    options: {
      source: options?.source ?? 'title',
      maxLength: options?.maxLength ?? 96,
    },
  });
}

/**
 * Create an enhanced image field with alt text and caption.
 */
export function createImageField(options?: {
  name?: string;
  title?: string;
  hotspot?: boolean;
}): SanityFieldConfig {
  return defineFieldCompat({
    name: options?.name ?? 'image',
    title: options?.title ?? 'Image',
    type: 'image',
    options: {
      hotspot: options?.hotspot ?? true,
    },
    fields: defineFieldsCompat([
      {
        name: 'alt',
        title: 'Alt Text',
        type: 'string',
        description: 'Alternative text for accessibility',
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
      },
    ]),
  });
}

/**
 * Create a rich text field (Portable Text).
 */
export function createRichTextField(options?: {
  name?: string;
  title?: string;
  styles?: Array<{ title: string; value: string }>;
}): SanityFieldConfig {
  return defineFieldCompat({
    name: options?.name ?? 'body',
    title: options?.title ?? 'Body',
    type: 'array',
    of: [
      {
        name: 'block',
        type: 'block',
        styles: options?.styles ?? [
          { title: 'Normal', value: 'normal' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'Quote', value: 'blockquote' },
        ],
      },
      {
        name: 'image',
        type: 'image',
        options: { hotspot: true },
      },
    ],
  });
}

/**
 * Create a complete blog post document type.
 */
export function createBlogPostType(options?: {
  name?: string;
  title?: string;
  additionalFields?: SanityFieldConfig[];
}): SanitySchemaType {
  const fields: SanityFieldConfig[] = [
    defineFieldCompat({ name: 'title', title: 'Title', type: 'string' }),
    createSlugField({ source: 'title' }),
    createImageField({ name: 'mainImage', title: 'Main Image' }),
    createRichTextField(),
    createSeoField(),
    ...(options?.additionalFields ?? []),
  ];

  return createDocumentType(
    options?.name ?? 'post',
    options?.title ?? 'Blog Post',
    fields
  );
}

/**
 * Create a reusable author document type.
 */
export function createAuthorType(options?: {
  name?: string;
  title?: string;
}): SanitySchemaType {
  return createDocumentType(
    options?.name ?? 'author',
    options?.title ?? 'Author',
    [
      defineFieldCompat({ name: 'name', title: 'Name', type: 'string' }),
      createSlugField({ source: 'name' }),
      createImageField({ name: 'avatar', title: 'Avatar' }),
      defineFieldCompat({ name: 'bio', title: 'Bio', type: 'text' }),
    ]
  );
}
