import type { HTMLAttributes, ReactNode } from 'react';

export interface TreeItemData {
  id: string;
  label: ReactNode;
  children?: TreeItemData[] | undefined;
}

export interface TreeViewProps extends HTMLAttributes<HTMLUListElement> {
  items: TreeItemData[];
  onSelectNode?: ((node: TreeItemData) => void) | undefined;
}