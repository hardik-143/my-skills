import { PatchEvent, SanityPatch } from './types';
import { createPatchEvent, set } from './patches';

export type ChangeHandler = (event: PatchEvent) => void;
export type RawChangeHandler = (...args: unknown[]) => void;

/**
 * Normalize an onChange handler to always produce PatchEvents.
 * Works with both v2-style PatchEvent.from() and v3+ set() callbacks.
 */
export function normalizeOnChange(onChange: RawChangeHandler): ChangeHandler {
  return (event: PatchEvent) => {
    onChange(event);
  };
}

/**
 * Create a universal onChange handler that bridges different API styles.
 * Detects if the consumer expects PatchEvent or simple value updates.
 */
export function createChangeHandler(
  onChange: (event: unknown) => void,
  usePatchEvents: boolean,
): (path: string, value: unknown) => void {
  return (path: string, value: unknown) => {
    if (usePatchEvents) {
      onChange(createPatchEvent(set(path, value)));
    } else {
      onChange(set(path, value));
    }
  };
}

/** Debounce event emissions */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number,
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const debounced = ((...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T & { cancel: () => void };
  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
  };
  return debounced;
}

/** Throttle event emissions */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number,
): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= ms) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}
