export * from './types';
export * from './components';
export * from './blocks';
export * from './templates';
export * from './themes';
export * from './guides';

import { COMPONENT_DOCS } from './components';
import { BLOCK_DOCS } from './blocks';
import { TEMPLATE_DOCS } from './templates';
import { THEME_DOCS } from './themes';
import { GUIDE_DOCS } from './guides';

export function getComponentDoc(id: string) {
  return COMPONENT_DOCS.find((c) => c.id === id);
}

export function getBlockDoc(id: string) {
  return BLOCK_DOCS.find((b) => b.id === id);
}

export function getTemplateDoc(id: string) {
  return TEMPLATE_DOCS.find((t) => t.id === id);
}

export function getThemeDoc(id: string) {
  return THEME_DOCS.find((th) => th.id === id);
}

export function getGuideDoc(id: string) {
  return GUIDE_DOCS.find((g) => g.id === id);
}
