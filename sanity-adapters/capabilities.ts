import { SanityCapabilities } from '../sanity-core/types';

/**
 * Detect available Sanity capabilities at runtime.
 * This is the heart of the forward-compatible system.
 * When a new Sanity version ships, you only need to update detection here.
 */
export function detectCapabilities(): SanityCapabilities {
  return {
    hasDefineField: moduleExportsValue('sanity', 'defineField'),
    hasDefineType: moduleExportsValue('sanity', 'defineType'),
    hasSanityUI: moduleExists('@sanity/ui'),
    hasHooksAPI: moduleExportsValue('sanity', 'useClient') || moduleExportsValue('sanity', 'useDocumentOperation'),
    hasPluginSystem: moduleExportsValue('sanity', 'definePlugin'),
    hasPreviewPane: moduleExists('@sanity/preview-url-secret') || moduleExists('sanity/desk'),
    hasPatchEvent: moduleExportsValue('sanity', 'PatchEvent') || moduleExportsValue('@sanity/form-builder', 'PatchEvent'),
    hasDocumentActions: moduleExportsValue('sanity', 'useDocumentOperation'),
    hasDeskTool: moduleExists('sanity/desk') || moduleExists('@sanity/desk-tool'),
    hasStructureTool: moduleExists('sanity/structure') || moduleExists('sanity/desk'),
    hasFormBuilder: moduleExists('@sanity/form-builder') || moduleExportsValue('sanity', 'useFormValue'),
  };
}

/** Check if a module can be required */
function moduleExists(name: string): boolean {
  try {
    require.resolve(name);
    return true;
  } catch {
    return false;
  }
}

/** Check if a module exports a specific named value */
function moduleExportsValue(moduleName: string, exportName: string): boolean {
  try {
    const mod = require(moduleName);
    return mod[exportName] !== undefined;
  } catch {
    return false;
  }
}

// Singleton cached capabilities (detected once, reused)
let _cached: SanityCapabilities | null = null;

/** Get cached capabilities (detects on first call) */
export function getCapabilities(): SanityCapabilities {
  if (!_cached) {
    _cached = detectCapabilities();
  }
  return _cached;
}

/** Reset cached capabilities (useful for testing) */
export function resetCapabilities(): void {
  _cached = null;
}

/** Override capabilities manually (useful for testing or forced environments) */
export function setCapabilities(caps: Partial<SanityCapabilities>): void {
  _cached = { ...getCapabilities(), ...caps };
}

/** Check a single capability */
export function hasCapability(key: keyof SanityCapabilities): boolean {
  return getCapabilities()[key];
}
