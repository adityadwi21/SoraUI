import { getTemplate } from '../registry/adapter';

export function handleInspectTemplate(params: { id: string }) {
  const template = getTemplate(params.id);
  if (!template) {
    throw new Error(`Template "${params.id}" not found in SoraUI canonical registry.`);
  }

  const compName = template.name.replace(/\s+/g, '');

  return {
    id: template.id,
    name: template.name,
    category: template.category,
    description: template.description,
    blocks: template.blocks,
    dependencies: template.dependencies,
    previewSupport: template.preview || { desktop: true, mobile: true },
    installation: {
      npm: `import { ${compName} } from '@soraui/react';`,
    },
    scaffoldSnippet: `<${compName} />`,
  };
}
