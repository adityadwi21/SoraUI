import type { ReactNode } from 'react';

export type ComponentCategory =
  | 'General'
  | 'Forms'
  | 'Navigation'
  | 'Feedback'
  | 'Overlays'
  | 'Data Display'
  | 'Layout';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface AccessibilityInfo {
  role?: string;
  keyboard?: Array<{
    key: string;
    action: string;
  }>;
  aria?: Array<{
    attribute: string;
    usage: string;
  }>;
}

export interface DocExample {
  id: string;
  title: string;
  description?: string;
  code: string;
  render: () => ReactNode;
}

export interface ComponentDoc {
  id: string;
  name: string;
  category: ComponentCategory;
  level: 1 | 2 | 3;
  description: string;
  dependencies: string[];
  tags: string[];
  status: 'stable' | 'experimental';
  examples: DocExample[];
  props: PropDefinition[];
  accessibility?: AccessibilityInfo;
  themingTokens?: string[];
}

export interface BlockDoc {
  id: string;
  name: string;
  category: 'auth' | 'dashboard' | 'marketing' | 'forms';
  description: string;
  dependencies: string[];
  tags: string[];
  preview: {
    desktop: boolean;
    mobile: boolean;
  };
  props: PropDefinition[];
  boundaryExplanation: {
    soraHandles: string[];
    consumerHandles: string[];
  };
  code: string;
  render: () => ReactNode;
}

export interface TemplateDoc {
  id: string;
  name: string;
  category: 'auth' | 'dashboard' | 'marketing' | 'settings';
  description: string;
  blocks: string[];
  dependencies: string[];
  tags: string[];
  preview: {
    desktop: boolean;
    mobile: boolean;
  };
  code: string;
  render: () => ReactNode;
}

export interface ThemeDoc {
  id: string;
  name: string;
  mode: 'light' | 'dark';
  description: string;
  accentScale: string;
  primaryColor: string;
}

export interface GuideDoc {
  id: string;
  title: string;
  category: 'Getting Started' | 'Theming' | 'CLI & Tooling' | 'Frameworks' | 'Migration' | 'AI & Tooling' | 'Governance';
  description: string;
  hasDotBadge?: boolean;
  customPath?: string;
}

