import React, { useState, useEffect, useMemo } from 'react';
import { COMPONENT_DOCS } from '../registry/components';
import { BLOCK_DOCS } from '../registry/blocks';
import { TEMPLATE_DOCS } from '../registry/templates';
import { THEME_DOCS } from '../registry/themes';
import { GUIDE_DOCS } from '../registry/guides';

export interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
}

export interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ open, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) {
          onClose();
        } else {
          // Open
          setQuery('');
        }
      }
      if (open && e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Build searchable index
  const allItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // Components
    COMPONENT_DOCS.forEach((c) => {
      items.push({
        id: `comp-${c.id}`,
        title: c.name,
        category: `Components (${c.category})`,
        description: c.description,
        href: `/components/${c.id}`,
      });
    });

    // Blocks
    BLOCK_DOCS.forEach((b) => {
      items.push({
        id: `block-${b.id}`,
        title: b.name,
        category: `Blocks (${b.category})`,
        description: b.description,
        href: `/blocks/${b.id}`,
      });
    });

    // Templates
    TEMPLATE_DOCS.forEach((t) => {
      items.push({
        id: `template-${t.id}`,
        title: t.name,
        category: 'Templates',
        description: t.description,
        href: `/templates/${t.id}`,
      });
    });

    // Themes
    THEME_DOCS.forEach((th) => {
      items.push({
        id: `theme-${th.id}`,
        title: `${th.name} Theme`,
        category: 'Themes',
        description: th.description,
        href: '/theming',
      });
    });

    // Guides
    GUIDE_DOCS.forEach((g) => {
      items.push({
        id: `guide-${g.id}`,
        title: g.title,
        category: `Guides (${g.category})`,
        description: g.description,
        href: `/guides/${g.id}`,
      });
    });

    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems
      .filter((item) => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.category.toLowerCase().includes(q))
      .slice(0, 10);
  }, [query, allItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: 'var(--ui-card, #ffffff)',
          color: 'var(--ui-foreground, #0c1a2b)',
          borderRadius: 'var(--ui-radius, 0.75rem)',
          border: '1px solid var(--ui-border, #e4e4e7)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid var(--ui-border, #e4e4e7)' }}>
          <span style={{ marginRight: '0.75rem', opacity: 0.5 }}>🔍</span>
          <input
            autoFocus
            type="text"
            placeholder="Search components, blocks, guides, and themes (⌘K)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '1rem',
              color: 'inherit',
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
              } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
                e.preventDefault();
                onNavigate(filteredItems[selectedIndex]!.href);
                onClose();
              }
            }}
          />
          <kbd
            style={{
              padding: '0.125rem 0.375rem',
              fontSize: '0.75rem',
              borderRadius: '4px',
              backgroundColor: 'var(--ui-muted, #f4f4f5)',
              border: '1px solid var(--ui-border, #e4e4e7)',
            }}
          >
            ESC
          </kbd>
        </div>

        <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '0.5rem' }}>
          {filteredItems.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--ui-muted-foreground, #71717a)', fontSize: '0.875rem' }}>
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.href);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    padding: '0.625rem 0.75rem',
                    borderRadius: 'var(--ui-radius, 0.375rem)',
                    backgroundColor: isSelected ? 'var(--ui-muted, #f4f4f5)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.125rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: isSelected ? 'var(--ui-primary, #0ea5e9)' : 'inherit' }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--ui-muted-foreground, #71717a)' }}>
                      {item.category}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--ui-muted-foreground, #71717a)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.description}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
