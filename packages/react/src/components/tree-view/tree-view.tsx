import { forwardRef, useState } from 'react';
import type { TreeViewProps, TreeItemData } from './tree-view.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

function TreeItemNode({
  node,
  onSelectNode,
}: {
  node: TreeItemData;
  onSelectNode?: ((n: TreeItemData) => void) | undefined;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      if (hasChildren && !expanded) {
        e.preventDefault();
        setExpanded(true);
      }
    } else if (e.key === 'ArrowLeft') {
      if (hasChildren && expanded) {
        e.preventDefault();
        setExpanded(false);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (hasChildren) setExpanded(!expanded);
      onSelectNode?.(node);
    }
  };

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
      className="sora-tree-view__item"
    >
      <div
        className="sora-tree-view__node"
        tabIndex={0}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
          onSelectNode?.(node);
        }}
        onKeyDown={handleKeyDown}
      >
        {hasChildren ? (
          <span className="sora-tree-view__arrow" aria-hidden="true">
            {expanded ? '▾' : '▸'}
          </span>
        ) : (
          <span className="sora-tree-view__spacer" />
        )}
        <span className="sora-tree-view__label">{node.label}</span>
      </div>
      {hasChildren && expanded && (
        <ul role="group" className="sora-tree-view__group">
          {node.children!.map((child) => (
            <TreeItemNode key={child.id} node={child} onSelectNode={onSelectNode} />
          ))}
        </ul>
      )}
    </li>
  );
}

export const TreeView = forwardRef<HTMLUListElement, TreeViewProps>(
  ({ items = [], onSelectNode, className, ...props }, ref) => (
    <ul ref={ref} role="tree" className={cx('sora-tree-view', className)} {...props}>
      {items.map((node) => (
        <TreeItemNode key={node.id} node={node} onSelectNode={onSelectNode} />
      ))}
    </ul>
  )
);
TreeView.displayName = 'TreeView';
export type { TreeViewProps, TreeItemData };