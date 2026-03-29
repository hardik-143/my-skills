/** Generate a unique key for Sanity array items */
export function generateKey(): string {
  return Math.random().toString(36).substring(2, 10);
}

/** Slugify a string (for slug fields) */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Truncate a string to maxLength with ellipsis */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 1) + '\u2026';
}

/** Deep clone an object (structuredClone fallback) */
export function deepClone<T>(obj: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

/** Check if a value is a plain object */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/** Create a GROQ projection string from field names */
export function groqProjection(fields: string[]): string {
  return `{ ${fields.join(', ')} }`;
}

/** Build a basic GROQ query */
export function groqQuery(
  type: string,
  filter?: string,
  projection?: string[],
): string {
  const filterStr = filter ? ` && ${filter}` : '';
  const projStr = projection ? ` ${groqProjection(projection)}` : '';
  return `*[_type == "${type}"${filterStr}]${projStr}`;
}

/** Safely try to require a module, returning undefined if not found */
export function tryRequire<T = unknown>(moduleName: string): T | undefined {
  try {
    return require(moduleName) as T;
  } catch {
    return undefined;
  }
}
