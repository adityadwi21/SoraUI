export interface RegistryComponentItem {
  name: string;
  type: string;
  level: 1 | 2 | 3;
  description: string;
  files: string[];
  dependencies: string[];
  tags?: string[] | undefined;
  props?: Array<{
    name: string;
    type: string;
    description: string;
    default?: string | undefined;
    required?: boolean | undefined;
  }> | undefined;
  accessibility?: {
    role?: string | undefined;
    keyboard?: Array<{ key: string; action: string }> | undefined;
    aria?: Array<{ attribute: string; usage: string }> | undefined;
  } | undefined;
  tokens?: string[] | undefined;
  example?: string | undefined;
}

export interface RegistryBlockItem {
  id: string;
  name: string;
  category: string;
  description: string;
  dependencies: string[];
  tags?: string[] | undefined;
  preview?: { desktop: boolean; mobile: boolean } | undefined;
  boundaryExplanation?: {
    soraHandles: string[];
    consumerHandles: string[];
  } | undefined;
  recipeCode?: string | undefined;
}

export interface RegistryTemplateItem {
  id: string;
  name: string;
  category: string;
  description: string;
  blocks: string[];
  dependencies: string[];
  preview?: { desktop: boolean; mobile: boolean } | undefined;
  sourceCode?: string | undefined;
}

export interface RegistryThemeItem {
  id: string;
  label: string;
  mode: 'light' | 'dark';
  default?: boolean | undefined;
  description?: string | undefined;
  tokens?: Record<string, string> | undefined;
}

export interface CanonicalRegistry {
  $schema: string;
  version: string;
  registryVersion: string;
  components: RegistryComponentItem[];
  blocks: RegistryBlockItem[];
  templates: RegistryTemplateItem[];
  themes: RegistryThemeItem[];
}

export type SearchMatchedBy = 'exact' | 'prefix' | 'alias' | 'category' | 'tag' | 'description';

export interface SearchResultItem {
  id: string;
  name: string;
  kind: 'component' | 'block' | 'template' | 'theme';
  category?: string | undefined;
  description: string;
  score: number;
  matchedBy: SearchMatchedBy;
}
