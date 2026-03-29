import { groqQuery, groqProjection } from '../sanity-core/utils';

/**
 * Build a paginated GROQ query.
 */
export function paginatedQuery(
  type: string,
  options?: {
    filter?: string;
    projection?: string[];
    orderBy?: string;
    order?: 'asc' | 'desc';
    offset?: number;
    limit?: number;
  }
): string {
  const filter = options?.filter ?? '';
  const orderBy = options?.orderBy;
  const order = options?.order ?? 'desc';
  const offset = options?.offset ?? 0;
  const limit = options?.limit ?? 10;

  let query = groqQuery(type, filter || undefined, options?.projection);

  if (orderBy) {
    query += ` | order(${orderBy} ${order})`;
  }

  query += `[${offset}...${offset + limit}]`;

  return query;
}

/**
 * Build a GROQ query that fetches a single document by slug.
 */
export function queryBySlug(type: string, slug: string, projection?: string[]): string {
  const projStr = projection ? ` ${groqProjection(projection)}` : '';
  return `*[_type == "${type}" && slug.current == "${slug}"][0]${projStr}`;
}

/**
 * Build a GROQ query that fetches a single document by ID.
 */
export function queryById(id: string, projection?: string[]): string {
  const projStr = projection ? ` ${groqProjection(projection)}` : '';
  return `*[_id == "${id}"][0]${projStr}`;
}

/**
 * Build a GROQ query for related documents (by reference).
 */
export function queryRelated(
  type: string,
  referenceField: string,
  referenceId: string,
  projection?: string[]
): string {
  return groqQuery(type, `${referenceField}._ref == "${referenceId}"`, projection);
}

/**
 * Build a GROQ query with full-text search.
 */
export function searchQuery(
  type: string,
  searchTerm: string,
  searchFields: string[],
  projection?: string[]
): string {
  const searchConditions = searchFields
    .map((field) => `${field} match "*${searchTerm}*"`)
    .join(' || ');
  return groqQuery(type, searchConditions, projection);
}

/**
 * Build a GROQ reference expansion.
 * Example: expandReference('author') => 'author->{...}'
 */
export function expandReference(field: string, projection?: string[]): string {
  const projStr = projection ? groqProjection(projection) : '...';
  return `${field}->{${projStr}}`;
}

/**
 * Build a complete blog post query with expanded references.
 */
export function blogPostQuery(slug: string): string {
  return `*[_type == "post" && slug.current == "${slug}"][0] {
  ...,
  author->{name, slug, avatar},
  "mainImageUrl": mainImage.asset->url,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url
    }
  }
}`;
}
