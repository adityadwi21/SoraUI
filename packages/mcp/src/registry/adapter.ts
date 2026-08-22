import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import embeddedRegistry from './canonical-registry.json';
import type {
  CanonicalRegistry,
  RegistryComponentItem,
  RegistryBlockItem,
  RegistryTemplateItem,
  RegistryThemeItem,
  SearchResultItem,
  SearchMatchedBy,
} from './types';

let cachedRegistry: CanonicalRegistry | null = null;

export function loadCanonicalRegistry(): CanonicalRegistry {
  if (cachedRegistry) return cachedRegistry;

  if (embeddedRegistry) {
    cachedRegistry = embeddedRegistry as unknown as CanonicalRegistry;
    return cachedRegistry;
  }

  throw new Error('Canonical registry could not be loaded.');
}

export function getComponent(name: string): RegistryComponentItem | undefined {
  const registry = loadCanonicalRegistry();
  const lower = name.toLowerCase().trim();
  return registry.components.find((c) => c.name.toLowerCase() === lower);
}

export function getBlock(id: string): RegistryBlockItem | undefined {
  const registry = loadCanonicalRegistry();
  const lower = id.toLowerCase().trim();
  return registry.blocks.find((b) => b.id.toLowerCase() === lower || b.name.toLowerCase() === lower);
}

export function getTemplate(id: string): RegistryTemplateItem | undefined {
  const registry = loadCanonicalRegistry();
  const lower = id.toLowerCase().trim();
  return registry.templates.find((t) => t.id.toLowerCase() === lower || t.name.toLowerCase() === lower);
}

export function getTheme(id: string): RegistryThemeItem | undefined {
  const registry = loadCanonicalRegistry();
  const lower = id.toLowerCase().trim();
  return registry.themes.find((th) => th.id.toLowerCase() === lower || th.label.toLowerCase() === lower);
}

export function listItems(kind: 'components'): RegistryComponentItem[];
export function listItems(kind: 'blocks', category?: string | undefined): RegistryBlockItem[];
export function listItems(kind: 'templates', category?: string | undefined): RegistryTemplateItem[];
export function listItems(kind: 'themes'): RegistryThemeItem[];
export function listItems(
  kind: 'components' | 'blocks' | 'templates' | 'themes',
  category?: string | undefined
): (RegistryComponentItem | RegistryBlockItem | RegistryTemplateItem | RegistryThemeItem)[];
export function listItems(
  kind: 'components' | 'blocks' | 'templates' | 'themes',
  category?: string | undefined
): any[] {
  const registry = loadCanonicalRegistry();
  if (kind === 'components') {
    return registry.components;
  }
  if (kind === 'blocks') {
    return category ? registry.blocks.filter((b) => b.category.toLowerCase() === category.toLowerCase()) : registry.blocks;
  }
  if (kind === 'templates') {
    return category ? registry.templates.filter((t) => t.category.toLowerCase() === category.toLowerCase()) : registry.templates;
  }
  return registry.themes;
}



export function searchRegistry(
  query: string,
  kind: 'all' | 'components' | 'blocks' | 'templates' | 'themes' = 'all',
  limit: number = 20
): SearchResultItem[] {
  const registry = loadCanonicalRegistry();
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResultItem[] = [];

  const checkMatch = (
    id: string,
    name: string,
    description: string,
    tags: string[] = [],
    category: string | undefined = undefined,
    itemKind: 'component' | 'block' | 'template' | 'theme' = 'component'
  ) => {
    const pluralKind = `${itemKind}s`;
    if (kind !== 'all' && kind !== pluralKind) return;

    const lowerId = id.toLowerCase();
    const lowerName = name.toLowerCase();
    const lowerDesc = description.toLowerCase();
    const lowerCategory = (category || '').toLowerCase();

    let score = 0;
    let matchedBy: SearchMatchedBy = 'description';

    if (lowerId === q || lowerName === q) {
      score = 100;
      matchedBy = 'exact';
    } else if (lowerId.startsWith(q) || lowerName.startsWith(q)) {
      score = 80;
      matchedBy = 'prefix';
    } else if (tags.some((t) => t.toLowerCase() === q)) {
      score = 60;
      matchedBy = 'alias';
    } else if (lowerCategory && lowerCategory.includes(q)) {
      score = 30;
      matchedBy = 'category';
    } else if (tags.some((t) => t.toLowerCase().includes(q))) {
      score = 20;
      matchedBy = 'tag';
    } else if (lowerDesc.includes(q)) {
      score = 10;
      matchedBy = 'description';
    }

    if (score > 0) {
      results.push({
        id,
        name,
        kind: itemKind,
        category,
        description,
        score,
        matchedBy,
      });
    }
  };

  // Search components
  for (const c of registry.components) {
    checkMatch(c.name, c.name, c.description, c.tags || [], 'ui', 'component');
  }

  // Search blocks
  for (const b of registry.blocks) {
    checkMatch(b.id, b.name, b.description, b.tags || [], b.category, 'block');
  }

  // Search templates
  for (const t of registry.templates) {
    checkMatch(t.id, t.name, t.description, [], t.category, 'template');
  }

  // Search themes
  for (const th of registry.themes) {
    checkMatch(th.id, th.label, th.description || `${th.label} (${th.mode}) theme preset`, [th.mode], th.mode, 'theme');
  }

  // Deterministic sorting: score DESC, name ASC
  return results
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);
}
