import embeddedRegistry from "./canonical-registry.json";

export interface RegistryItem {
  name: string;
  type?: string;
  level?: number;
  description: string;
  dependencies?: string[];
  tags?: string[];
}

export interface BlockItem {
  id: string;
  name: string;
  category: string;
  dependencies: string[];
}

export interface TemplateItem {
  id: string;
  name: string;
  category: string;
  blocks: string[];
  dependencies: string[];
}

export interface ThemeItem {
  id: string;
  label: string;
  mode: "light" | "dark";
}

export const ALL_COMPONENTS: RegistryItem[] = embeddedRegistry.components.map(
  (c: any) => ({
    name: c.name,
    type: c.type || "registry:ui",
    level: c.level || 1,
    description: c.description || "",
    dependencies: c.dependencies || [],
    tags: [c.name, c.type, ...(c.dependencies || [])],
  }),
);

export const ALL_BLOCKS: BlockItem[] = embeddedRegistry.blocks.map(
  (b: any) => ({
    id: b.id,
    name: b.name,
    category: b.category,
    dependencies: b.dependencies || [],
  }),
);

export const ALL_TEMPLATES: TemplateItem[] = embeddedRegistry.templates.map(
  (t: any) => ({
    id: t.id,
    name: t.name,
    category: t.category,
    blocks: t.blocks || [],
    dependencies: t.dependencies || [],
  }),
);

export const ALL_THEMES: ThemeItem[] = (embeddedRegistry.themes || []).map(
  (th: any) => ({
    id: th.id,
    label: th.label,
    mode: th.mode,
  }),
);

/**
 * Resolves all required component dependencies for a given item recursively.
 */
export function resolveDependencies(
  id: string,
  kind: "component" | "block" | "template" = "component",
): string[] {
  const visited = new Set<string>();
  const resolved = new Set<string>();

  function traverse(
    currentId: string,
    currentKind: "component" | "block" | "template",
  ) {
    const key = `${currentKind}:${currentId}`;
    if (visited.has(key)) {
      throw new Error(`Circular dependency detected in registry graph: ${key}`);
    }
    visited.add(key);

    if (currentKind === "template") {
      const template = ALL_TEMPLATES.find((t) => t.id === currentId);
      if (template) {
        template.blocks.forEach((bId) => traverse(bId, "block"));
        template.dependencies.forEach((cId) => traverse(cId, "component"));
      }
    } else if (currentKind === "block") {
      const block = ALL_BLOCKS.find((b) => b.id === currentId);
      if (block) {
        block.dependencies.forEach((cId) => traverse(cId, "component"));
      }
    } else {
      resolved.add(currentId);
      const comp = ALL_COMPONENTS.find((c) => c.name === currentId);
      if (comp?.dependencies) {
        comp.dependencies.forEach((cId) => {
          if (!cId.startsWith("@")) {
            traverse(cId, "component");
          }
        });
      }
    }

    visited.delete(key);
  }

  traverse(id, kind);
  return Array.from(resolved);
}

/**
 * Generates component source code.
 */
export function getComponentCode(name: string): string {
  const pascalName = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  return `import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface ${pascalName}Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

function cx(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const ${pascalName} = forwardRef<HTMLDivElement, ${pascalName}Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx('sora-${name}', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
${pascalName}.displayName = '${pascalName}';
`;
}

/**
 * Generates block source code.
 */
export function getBlockCode(blockId: string): string {
  const block = ALL_BLOCKS.find((b) => b.id === blockId);
  const blockName = block ? block.name : blockId;
  const pascalName = blockId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  return `import React from 'react';

export interface ${pascalName}Props {
  className?: string;
  children?: React.ReactNode;
}

export function ${pascalName}({ className, children }: ${pascalName}Props) {
  return (
    <section className={className || 'sora-block-${blockId}'} aria-label="${blockName}">
      <div className="sora-block__container">
        {children || <h2>${blockName}</h2>}
      </div>
    </section>
  );
}
`;
}

/**
 * Generates theme CSS snippet.
 */
export function getThemeCSS(themeId: string): string {
  return `/* SoraUI Theme Tokens — ${themeId} */
@import '@soraui/core/theme/presets/${themeId}.css';
@import '@soraui/react/styles';
`;
}
