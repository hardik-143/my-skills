import { DeskStructureItem } from '../../sanity-core/types';
import { getCapabilities } from '../capabilities';

/**
 * Create a desk structure list item in a version-agnostic way.
 */
export function createListItem(
  id: string,
  title: string,
  schemaType?: string
): DeskStructureItem {
  return {
    id,
    title,
    type: 'documentList',
    schemaType,
  };
}

/**
 * Create a desk structure using the available API.
 * Supports both old deskTool and new structureTool patterns.
 */
export function createStructureCompat(
  items: DeskStructureItem[]
): (S: unknown) => unknown {
  const caps = getCapabilities();

  return (S: unknown) => {
    // If we have the structure builder (S), use it
    if (S && typeof S === 'object' && 'list' in S) {
      try {
        const builder = S as StructureBuilder;
        return builder
          .list()
          .title('Content')
          .items(
            items.map((item) =>
              builder
                .listItem()
                .title(item.title)
                .id(item.id)
                .child(
                  item.schemaType
                    ? builder.documentList().title(item.title).filter(`_type == "${item.schemaType}"`)
                    : undefined
                )
            )
          );
      } catch {
        // Fall through to return raw items
      }
    }
    return items;
  };
}

/**
 * Create a singleton document desk item.
 */
export function createSingletonItem(
  id: string,
  title: string,
  schemaType: string
): DeskStructureItem {
  return {
    id,
    title,
    type: 'document',
    schemaType,
  };
}

/**
 * Wrap a custom component as a desk tool view.
 */
export function createComponentView(
  id: string,
  title: string
): DeskStructureItem {
  return {
    id,
    title,
    type: 'component',
  };
}

/** Minimal structure builder interface for type safety */
interface StructureBuilder {
  list: () => { title: (t: string) => { items: (i: unknown[]) => unknown } };
  listItem: () => { title: (t: string) => { id: (i: string) => { child: (c: unknown) => unknown } } };
  documentList: () => { title: (t: string) => { filter: (f: string) => unknown } };
  document: () => { id: (i: string) => { schemaType: (s: string) => unknown } };
}
