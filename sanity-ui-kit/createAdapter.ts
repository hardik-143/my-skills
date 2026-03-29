import React from 'react';

export interface BaseUIProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Create an adaptive UI component that:
 * 1. Tries to use the @sanity/ui version if available
 * 2. Falls back to a custom React component with inline styles
 */
export function createAdaptiveComponent<P extends object>(
  sanityUIName: string,
  FallbackComponent: React.FC<P>
): React.FC<P> {
  const AdaptiveComponent: React.FC<P> = (props) => {
    const SanityComponent = getSanityUIComponentSafe(sanityUIName);
    if (SanityComponent) {
      return React.createElement(
        SanityComponent,
        props as unknown as Record<string, unknown>
      );
    }
    return React.createElement(FallbackComponent, props);
  };
  AdaptiveComponent.displayName = sanityUIName;
  return AdaptiveComponent;
}

function getSanityUIComponentSafe(
  name: string
): React.ComponentType<Record<string, unknown>> | undefined {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ui = require('@sanity/ui');
    return ui[name] as React.ComponentType<Record<string, unknown>> | undefined;
  } catch {
    return undefined;
  }
}
