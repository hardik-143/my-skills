// Sanity field configuration
export interface SanityFieldConfig {
  name: string;
  title?: string;
  type: string;
  description?: string;
  validation?: ValidationRule[];
  options?: Record<string, unknown>;
  hidden?: boolean | ((context: HiddenContext) => boolean);
  readOnly?: boolean | ((context: ReadOnlyContext) => boolean);
  initialValue?: unknown;
  fieldsets?: FieldsetConfig[];
  fields?: SanityFieldConfig[];
  of?: SanityFieldConfig[];
  [key: string]: unknown;
}

export interface HiddenContext {
  document?: Record<string, unknown>;
  parent?: unknown;
  value?: unknown;
  currentUser?: SanityUser;
}

export interface ReadOnlyContext {
  document?: Record<string, unknown>;
  parent?: unknown;
  value?: unknown;
  currentUser?: SanityUser;
}

export interface SanityUser {
  id: string;
  name: string;
  email: string;
  roles: Array<{ name: string; title: string }>;
}

export interface ValidationRule {
  constraint?: unknown;
  flag?: string;
  message?: string;
}

export interface FieldsetConfig {
  name: string;
  title?: string;
  options?: { collapsible?: boolean; collapsed?: boolean };
}

// Schema types
export interface SanitySchemaType {
  name: string;
  title?: string;
  type: string;
  fields?: SanityFieldConfig[];
  preview?: PreviewConfig;
  orderings?: OrderingConfig[];
  [key: string]: unknown;
}

export interface PreviewConfig {
  select?: Record<string, string>;
  prepare?: (selection: Record<string, unknown>) => {
    title?: string;
    subtitle?: string;
    media?: unknown;
  };
}

export interface OrderingConfig {
  title: string;
  name: string;
  by: Array<{ field: string; direction: 'asc' | 'desc' }>;
}

// Patch types
export interface SanityPatch {
  type: 'set' | 'unset' | 'setIfMissing' | 'inc' | 'dec' | 'insert';
  path: string;
  value?: unknown;
}

export interface PatchEvent {
  patches: SanityPatch[];
}

// Input component props (universal)
export interface SanityInputProps<T = unknown> {
  value?: T;
  type: SanityFieldConfig;
  onChange: (event: PatchEvent | unknown) => void;
  onFocus?: (path?: string[]) => void;
  onBlur?: () => void;
  readOnly?: boolean;
  markers?: SanityMarker[];
  presence?: SanityPresence[];
  level?: number;
  path?: string[];
  focusPath?: string[];
  document?: Record<string, unknown>;
}

export interface SanityMarker {
  type: string;
  level: 'error' | 'warning' | 'info';
  path: string[];
  item?: { message: string };
}

export interface SanityPresence {
  user: SanityUser;
  path: string[];
  sessionId: string;
  lastActiveAt: string;
}

// Client types
export interface SanityClientConfig {
  projectId: string;
  dataset: string;
  apiVersion?: string;
  useCdn?: boolean;
  token?: string;
}

// Desk structure types
export interface DeskStructureItem {
  id: string;
  title: string;
  type: 'list' | 'documentList' | 'document' | 'component';
  schemaType?: string;
  child?: DeskStructureItem | DeskStructureItem[];
}

// Plugin types
export interface SanityPlugin {
  name: string;
  schema?: { types?: SanitySchemaType[] };
  document?: { actions?: unknown[]; badges?: unknown[] };
  tools?: unknown[];
}

// Capability flags
export interface SanityCapabilities {
  hasDefineField: boolean;
  hasDefineType: boolean;
  hasSanityUI: boolean;
  hasHooksAPI: boolean;
  hasPluginSystem: boolean;
  hasPreviewPane: boolean;
  hasPatchEvent: boolean;
  hasDocumentActions: boolean;
  hasDeskTool: boolean;
  hasStructureTool: boolean;
  hasFormBuilder: boolean;
}
