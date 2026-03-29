/** Safely get a deeply nested value by dot-path */
export function getValue<T = unknown>(
  obj: Record<string, unknown> | undefined,
  path: string,
): T | undefined {
  if (!obj || !path) return undefined;
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return current as T | undefined;
}

/** Immutably set a deeply nested value by dot-path. Returns a new object. */
export function setValue<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  value: unknown,
): T {
  if (!path) return value as T;
  const keys = path.split('.');
  const result = { ...obj };
  let current: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nested = current[key];
    const copy =
      nested && typeof nested === 'object' && !Array.isArray(nested)
        ? { ...(nested as Record<string, unknown>) }
        : {};
    current[key] = copy;
    current = copy;
  }
  current[keys[keys.length - 1]] = value;
  return result;
}

/** Immutably delete a deeply nested value by dot-path. Returns a new object. */
export function deleteValue<T extends Record<string, unknown>>(
  obj: T,
  path: string,
): T {
  if (!path) return obj;
  const keys = path.split('.');
  if (keys.length === 1) {
    const { [keys[0]]: _, ...rest } = obj;
    return rest as T;
  }
  const result = { ...obj };
  let current: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nested = current[key];
    if (!nested || typeof nested !== 'object') return result;
    const copy = { ...(nested as Record<string, unknown>) };
    current[key] = copy;
    current = copy;
  }
  delete current[keys[keys.length - 1]];
  return result;
}

/** Check if a deeply nested path exists */
export function hasValue(
  obj: Record<string, unknown> | undefined,
  path: string,
): boolean {
  return getValue(obj, path) !== undefined;
}

/** Merge deeply nested values */
export function mergeValues<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
): T {
  const result = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetVal = target[key];
      const sourceVal = source[key];
      if (
        targetVal &&
        sourceVal &&
        typeof targetVal === 'object' &&
        typeof sourceVal === 'object' &&
        !Array.isArray(targetVal) &&
        !Array.isArray(sourceVal)
      ) {
        (result as Record<string, unknown>)[key] = mergeValues(
          targetVal as Record<string, unknown>,
          sourceVal as Record<string, unknown>,
        );
      } else {
        (result as Record<string, unknown>)[key] = sourceVal;
      }
    }
  }
  return result;
}
