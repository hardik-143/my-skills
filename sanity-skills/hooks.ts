import { SanityClientConfig } from '../sanity-core/types';
import { createClientCompat, executeQuery } from '../sanity-adapters/client';
import { getCapabilities } from '../sanity-adapters/capabilities';

/**
 * Create a query executor bound to a client config.
 * This is not a React hook but a factory for query functions.
 */
export function createQueryExecutor(config: SanityClientConfig) {
  const client = createClientCompat(config);

  return {
    /**
     * Execute a GROQ query
     */
    async fetch<T = unknown>(query: string, params?: Record<string, unknown>): Promise<T> {
      return client.fetch<T>(query, params);
    },

    /**
     * Get a single document by ID
     */
    async getDocument<T = Record<string, unknown>>(id: string): Promise<T> {
      return client.fetch<T>(`*[_id == $id][0]`, { id });
    },

    /**
     * Get documents by type
     */
    async getDocumentsByType<T = Record<string, unknown>>(
      type: string,
      options?: { limit?: number; offset?: number; orderBy?: string }
    ): Promise<T[]> {
      const limit = options?.limit ?? 10;
      const offset = options?.offset ?? 0;
      const order = options?.orderBy ? `| order(${options.orderBy})` : '';
      return client.fetch<T[]>(
        `*[_type == $type] ${order} [$offset...$end]`,
        { type, offset, end: offset + limit }
      );
    },
  };
}

/**
 * Universal query function usable from any context.
 * The naming "useSanityQuery" follows the common hook pattern for discoverability,
 * but it's a standalone async function, not a React hook.
 */
export async function useSanityQuery<T = unknown>(
  config: SanityClientConfig,
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return executeQuery<T>(config, query, params);
}

/**
 * Try to use the native Sanity client hook if in a Sanity Studio context.
 * Returns the hook function if available, or undefined.
 */
export function getNativeClientHook(): ((options?: Record<string, unknown>) => unknown) | undefined {
  const caps = getCapabilities();
  if (caps.hasHooksAPI) {
    try {
      const sanity = require('sanity');
      if (typeof sanity.useClient === 'function') {
        return sanity.useClient;
      }
    } catch {
      // Not available
    }
  }
  return undefined;
}
