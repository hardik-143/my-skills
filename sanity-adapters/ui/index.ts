import type React from 'react';
import { getCapabilities } from '../capabilities';

/**
 * Check if @sanity/ui is available
 */
export function hasSanityUI(): boolean {
  return getCapabilities().hasSanityUI;
}

/**
 * Safely import a component from @sanity/ui.
 * Returns undefined if not available.
 */
export function getSanityUIComponent<T = unknown>(componentName: string): T | undefined {
  if (!hasSanityUI()) return undefined;
  try {
    const ui = require('@sanity/ui');
    return ui[componentName] as T | undefined;
  } catch {
    return undefined;
  }
}

/**
 * Get the Sanity UI theme provider, or undefined if not available.
 */
export function getThemeProvider(): React.ComponentType<{ children: React.ReactNode }> | undefined {
  return getSanityUIComponent('ThemeProvider');
}

/**
 * Attempt to get a styled-components styled function from Sanity UI's dependencies.
 */
export function getStyledFunction(): unknown {
  try {
    return require('styled-components').default;
  } catch {
    return undefined;
  }
}
