import type React from 'react';
import { SanityInputProps } from '../../sanity-core/types';
import { createPatchEvent, set } from '../../sanity-core/patches';
import { getCapabilities } from '../capabilities';

/**
 * Normalize input component props across Sanity versions.
 * v2 uses `type`, v3+ uses `schemaType`.
 * v2 uses PatchEvent.from(), v3+ uses `set()` from 'sanity'.
 */
export function normalizeInputProps(props: Record<string, unknown>): SanityInputProps {
  return {
    value: props.value as SanityInputProps['value'],
    type: (props.schemaType ?? props.type) as SanityInputProps['type'],
    onChange: props.onChange as SanityInputProps['onChange'],
    onFocus: props.onFocus as SanityInputProps['onFocus'],
    onBlur: props.onBlur as SanityInputProps['onBlur'],
    readOnly: props.readOnly as boolean | undefined,
    markers: (props.validation ?? props.markers) as SanityInputProps['markers'],
    presence: props.presence as SanityInputProps['presence'],
    level: props.level as number | undefined,
    path: props.path as string[] | undefined,
    focusPath: props.focusPath as string[] | undefined,
    document: props.document as Record<string, unknown> | undefined,
  };
}

/**
 * Create a universal patch handler.
 * Detects whether PatchEvent class is available and uses appropriate method.
 */
export function createPatchHandler(onChange: (event: unknown) => void): (path: string, value: unknown) => void {
  const caps = getCapabilities();

  return (path: string, value: unknown) => {
    if (caps.hasPatchEvent) {
      try {
        // Try to use the native PatchEvent
        const sanityModule = safeRequire('sanity') ?? safeRequire('@sanity/form-builder');
        const NativePatchEvent = sanityModule?.PatchEvent as { from?: (...args: unknown[]) => unknown } | undefined;
        const nativeSet = sanityModule?.set as ((...args: unknown[]) => unknown) | undefined;
        if (NativePatchEvent?.from && nativeSet) {
          onChange(NativePatchEvent.from(nativeSet(value)));
          return;
        }
      } catch {
        // Fall through
      }
    }

    // v3+ style: just call onChange with the set patch
    if (path === '' || path === '.') {
      onChange(set(path, value));
    } else {
      onChange(createPatchEvent(set(path, value)));
    }
  };
}

/**
 * Create a component wrapper that normalizes props automatically.
 */
export function withNormalizedProps<P extends Record<string, unknown>>(
  Component: React.ComponentType<SanityInputProps & P>
): React.ComponentType<Record<string, unknown>> {
  const WrappedComponent = (props: Record<string, unknown>) => {
    const normalized = normalizeInputProps(props);
    const Comp = Component as React.FC<SanityInputProps & P>;
    return Comp({ ...normalized, ...props } as SanityInputProps & P);
  };
  WrappedComponent.displayName = `WithNormalizedProps(${Component.displayName ?? Component.name ?? 'Component'})`;
  return WrappedComponent;
}

function safeRequire(name: string): Record<string, unknown> | undefined {
  try {
    return require(name) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}
