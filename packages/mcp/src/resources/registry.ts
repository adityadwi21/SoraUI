import { loadCanonicalRegistry } from '../registry/adapter';

export function getRegistryResource(subpath?: string) {
  const registry = loadCanonicalRegistry();

  if (subpath === 'components') {
    return {
      uri: 'soraui://registry/components',
      mimeType: 'application/json',
      text: JSON.stringify({ components: registry.components }, null, 2),
    };
  }

  if (subpath === 'blocks') {
    return {
      uri: 'soraui://registry/blocks',
      mimeType: 'application/json',
      text: JSON.stringify({ blocks: registry.blocks }, null, 2),
    };
  }

  if (subpath === 'templates') {
    return {
      uri: 'soraui://registry/templates',
      mimeType: 'application/json',
      text: JSON.stringify({ templates: registry.templates }, null, 2),
    };
  }

  return {
    uri: 'soraui://registry',
    mimeType: 'application/json',
    text: JSON.stringify(registry, null, 2),
  };
}
