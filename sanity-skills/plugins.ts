import { SanityPlugin, SanitySchemaType } from '../sanity-core/types';
import { getCapabilities } from '../sanity-adapters/capabilities';

/**
 * Create a Sanity plugin in a version-agnostic way.
 * Uses definePlugin() when available (v3+), otherwise returns raw config.
 */
export function createPluginCompat(config: SanityPlugin): SanityPlugin | unknown {
  const caps = getCapabilities();

  if (caps.hasPluginSystem) {
    try {
      const { definePlugin } = require('sanity');
      if (typeof definePlugin === 'function') {
        return definePlugin({
          name: config.name,
          schema: config.schema,
          document: config.document,
          tools: config.tools,
        });
      }
    } catch {
      // Fall through
    }
  }

  // v2 style: return the config for manual registration
  return config;
}

/**
 * Create a plugin that registers schema types.
 */
export function createSchemaPlugin(
  name: string,
  types: SanitySchemaType[]
): SanityPlugin | unknown {
  return createPluginCompat({
    name,
    schema: { types },
  });
}

/**
 * Merge multiple plugins into a single configuration.
 */
export function mergePlugins(...plugins: SanityPlugin[]): {
  schema: { types: SanitySchemaType[] };
} {
  const allTypes: SanitySchemaType[] = [];
  for (const plugin of plugins) {
    if (plugin.schema?.types) {
      allTypes.push(...plugin.schema.types);
    }
  }
  return { schema: { types: allTypes } };
}
