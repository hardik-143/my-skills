import { SanityPatch, PatchEvent } from './types';

/** Create a 'set' patch */
export function set(path: string, value: unknown): SanityPatch {
  return { type: 'set', path, value };
}

/** Create an 'unset' patch */
export function unset(path: string): SanityPatch {
  return { type: 'unset', path };
}

/** Create a 'setIfMissing' patch */
export function setIfMissing(path: string, value: unknown): SanityPatch {
  return { type: 'setIfMissing', path, value };
}

/** Create an 'inc' (increment) patch */
export function inc(path: string, value: number): SanityPatch {
  return { type: 'inc', path, value };
}

/** Create a 'dec' (decrement) patch */
export function dec(path: string, value: number): SanityPatch {
  return { type: 'dec', path, value };
}

/** Create an insert patch */
export function insert(
  path: string,
  items: unknown[],
  position: 'before' | 'after' | 'replace' = 'after',
): SanityPatch {
  return { type: 'insert', path, value: { items, position } };
}

/** Create a PatchEvent from patches */
export function createPatchEvent(...patches: SanityPatch[]): PatchEvent {
  return { patches };
}

/**
 * Normalize incoming change events to PatchEvent format.
 * Handles both v2 PatchEvent and v3+ callback patterns.
 */
export function normalizePatchEvent(event: unknown): PatchEvent {
  if (event && typeof event === 'object' && 'patches' in event) {
    return event as PatchEvent;
  }
  // If it's a raw value, treat it as a set on root
  return createPatchEvent(set('', event));
}

/** Apply patches to a value object (for local preview) */
export function applyPatches<T extends Record<string, unknown>>(
  doc: T,
  patches: SanityPatch[],
): T {
  const result = { ...doc };
  for (const patch of patches) {
    switch (patch.type) {
      case 'set':
        if (patch.path === '' || patch.path === '.') {
          return patch.value as T;
        }
        setNestedValue(result, patch.path, patch.value);
        break;
      case 'unset':
        deleteNestedValue(result, patch.path);
        break;
      case 'setIfMissing':
        if (getNestedValue(result, patch.path) === undefined) {
          setNestedValue(result, patch.path, patch.value);
        }
        break;
      case 'inc': {
        const currentInc = getNestedValue(result, patch.path);
        if (typeof currentInc === 'number' && typeof patch.value === 'number') {
          setNestedValue(result, patch.path, currentInc + patch.value);
        }
        break;
      }
      case 'dec': {
        const currentDec = getNestedValue(result, patch.path);
        if (typeof currentDec === 'number' && typeof patch.value === 'number') {
          setNestedValue(result, patch.path, currentDec - patch.value);
        }
        break;
      }
    }
  }
  return result;
}

function setNestedValue(
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): void {
  const keys = path.split('.');
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (
      !(keys[i] in current) ||
      typeof current[keys[i]] !== 'object' ||
      current[keys[i]] === null
    ) {
      current[keys[i]] = {};
    }
    current = current[keys[i]] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function deleteNestedValue(
  obj: Record<string, unknown>,
  path: string,
): void {
  const keys = path.split('.');
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current) || typeof current[keys[i]] !== 'object') {
      return;
    }
    current = current[keys[i]] as Record<string, unknown>;
  }
  delete current[keys[keys.length - 1]];
}
