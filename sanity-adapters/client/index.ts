import { SanityClientConfig } from '../../sanity-core/types';

/**
 * Create a Sanity client in a version-agnostic way.
 * Detects available client library and uses it.
 */
export function createClientCompat(config: SanityClientConfig): SanityClientLike {
  // Try modern 'sanity' client hook
  try {
    const sanity = require('sanity');
    if (typeof sanity.createClient === 'function') {
      return sanity.createClient(config);
    }
  } catch { /* not available */ }

  // Try @sanity/client directly
  try {
    const clientModule = require('@sanity/client');
    const createClient = clientModule.createClient ?? clientModule.default ?? clientModule;
    if (typeof createClient === 'function') {
      return createClient(config);
    }
  } catch { /* not available */ }

  // Return a no-op client that warns about missing dependencies
  return createFallbackClient(config);
}

/** Minimal client interface for compatibility */
export interface SanityClientLike {
  fetch: <T = unknown>(query: string, params?: Record<string, unknown>) => Promise<T>;
  create: (doc: Record<string, unknown>) => Promise<Record<string, unknown>>;
  patch: (id: string) => PatchBuilderLike;
  delete: (id: string) => Promise<Record<string, unknown>>;
  config: () => SanityClientConfig;
}

export interface PatchBuilderLike {
  set: (attrs: Record<string, unknown>) => PatchBuilderLike;
  unset: (keys: string[]) => PatchBuilderLike;
  commit: () => Promise<Record<string, unknown>>;
}

function createFallbackClient(config: SanityClientConfig): SanityClientLike {
  const warn = (method: string) => {
    console.warn(
      `[sanity-toolkit] No Sanity client library found. Install @sanity/client to use ${method}(). ` +
      `Project: ${config.projectId}, Dataset: ${config.dataset}`
    );
  };

  const noop = async () => {
    warn('fetch');
    return {} as Record<string, unknown>;
  };

  return {
    fetch: async <T = unknown>(query: string) => {
      warn('fetch');
      return undefined as unknown as T;
    },
    create: noop,
    patch: (id: string) => ({
      set: function(this: PatchBuilderLike) { warn('patch.set'); return this; },
      unset: function(this: PatchBuilderLike) { warn('patch.unset'); return this; },
      commit: noop,
    }),
    delete: noop,
    config: () => config,
  };
}

/**
 * Universal GROQ query executor.
 * Uses whatever client is available.
 */
export async function executeQuery<T = unknown>(
  config: SanityClientConfig,
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  const client = createClientCompat(config);
  return client.fetch<T>(query, params);
}
