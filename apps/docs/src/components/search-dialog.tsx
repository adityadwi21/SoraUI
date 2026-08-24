import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  BookOpen,
  Box,
  Layers,
  LayoutTemplate,
  Palette,
  ArrowRight,
} from "lucide-react";
import { COMPONENT_DOCS } from "../registry/components";
import { BLOCK_DOCS } from "../registry/blocks";
import { TEMPLATE_DOCS } from "../registry/templates";
import { THEME_DOCS } from "../registry/themes";
import { GUIDE_DOCS } from "../registry/guides";

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

const CAT_COLORS: Record<string, string> = {
  Guide: "#6366f1",
  Component: "#0ea5e9",
  Block: "#f59e0b",
  Template: "#22c55e",
  Theme: "#a855f7",
};

const catColor = (cat: string) => {
  const k = Object.keys(CAT_COLORS).find((k) => cat.startsWith(k));
  return k ? CAT_COLORS[k]! : "#71717a";
};

const getCategoryIcon = (cat: string) => {
  if (cat.startsWith("Guide")) return <BookOpen size={14} />;
  if (cat.startsWith("Component")) return <Box size={14} />;
  if (cat.startsWith("Block")) return <Layers size={14} />;
  if (cat.startsWith("Template")) return <LayoutTemplate size={14} />;
  if (cat.startsWith("Theme")) return <Palette size={14} />;
  return <Search size={14} />;
};

export const SearchDialog: React.FC<SearchDialogProps> = ({
  open,
  onClose,
  onNavigate,
}) => {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (open && e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  const all: SearchResultItem[] = useMemo(() => {
    const r: SearchResultItem[] = [];
    GUIDE_DOCS.forEach((g) =>
      r.push({
        id: `g-${g.id}`,
        title: g.title,
        category: "Guide",
        description: g.description,
        href: g.customPath || `/guides/${g.id}`,
      }),
    );
    [
      {
        id: "nextjs",
        title: "Next.js Integration",
        description: "Next.js App Router and Pages Router setup with SoraUI.",
        href: "/guides/nextjs",
      },
      {
        id: "vite",
        title: "Vite & SPA Integration",
        description: "Fast single-page application setup with Vite and React.",
        href: "/guides/vite",
      },
      {
        id: "laravel",
        title: "Laravel Integration",
        description: "Laravel 11+ Inertia.js React setup with design tokens.",
        href: "/guides/laravel",
      },
      {
        id: "react-router",
        title: "React Router Integration",
        description: "React Router v7 / Remix setup with SSR support.",
        href: "/guides/react-router",
      },
      {
        id: "astro",
        title: "Astro Integration",
        description:
          "Astro content-first setup with React Island architecture.",
        href: "/guides/astro",
      },
      {
        id: "manual",
        title: "Manual Installation",
        description: "Install SoraUI dependencies and tokens manually.",
        href: "/guides/manual",
      },
      {
        id: "migration",
        title: "Migration from Radix & shadcn",
        description: "Transition existing components and tokens to SoraUI.",
        href: "/guides/migration",
      },
      {
        id: "semver",
        title: "Semantic Versioning Policy",
        description:
          "Public API stability, release cadence, and deprecation lifecycle.",
        href: "/guides/semver",
      },
    ].forEach((f) =>
      r.push({
        id: `f-${f.id}`,
        title: f.title,
        category: "Framework",
        description: f.description,
        href: f.href,
      }),
    );
    COMPONENT_DOCS.forEach((c) =>
      r.push({
        id: `c-${c.id}`,
        title: c.name,
        category: `Component · ${c.category}`,
        description: c.description,
        href: `/components/${c.id}`,
      }),
    );
    BLOCK_DOCS.forEach((b) =>
      r.push({
        id: `b-${b.id}`,
        title: b.name,
        category: `Block · ${b.category}`,
        description: b.description,
        href: `/blocks/${b.id}`,
      }),
    );
    TEMPLATE_DOCS.forEach((t) =>
      r.push({
        id: `t-${t.id}`,
        title: t.name,
        category: "Template",
        description: t.description,
        href: `/templates/${t.id}`,
      }),
    );
    THEME_DOCS.forEach((th) =>
      r.push({
        id: `th-${th.id}`,
        title: `${th.name} Theme`,
        category: "Theme",
        description: th.description,
        href: "/guides/theming",
      }),
    );
    return r;
  }, []);

  const items = useMemo(() => {
    if (!q.trim()) return all.slice(0, 8);
    const lq = q.toLowerCase();
    return all
      .filter(
        (i) =>
          i.title.toLowerCase().includes(lq) ||
          i.description.toLowerCase().includes(lq) ||
          i.category.toLowerCase().includes(lq),
      )
      .slice(0, 10);
  }, [q, all]);

  useEffect(() => setSel(0), [items]);

  if (!open) return null;

  const go = (href: string) => {
    onNavigate(href);
    onClose();
  };

  return (
    <div
      className="docs-search-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label="Search"
    >
      <div className="docs-search-panel" onClick={(e) => e.stopPropagation()}>
        {/* Input row */}
        <div className="docs-search-input-row">
          <Search
            size={18}
            style={{ color: "var(--docs-fg-muted)", flexShrink: 0 }}
          />
          <input
            ref={inputRef}
            type="text"
            className="docs-search-input"
            placeholder="Search components, blocks, guides..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((p) => (p + 1) % items.length);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((p) => (p - 1 + items.length) % items.length);
              } else if (e.key === "Enter" && items[sel]) {
                e.preventDefault();
                go(items[sel]!.href);
              }
            }}
          />
          <kbd className="docs-search-esc">ESC</kbd>
        </div>

        {/* Results */}
        <div className="docs-search-results">
          {!items.length ? (
            <div className="docs-search-empty">
              No results for &ldquo;{q}&rdquo;
            </div>
          ) : (
            items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`docs-search-result-btn${idx === sel ? " selected" : ""}`}
                onClick={() => go(item.href)}
                onMouseEnter={() => setSel(idx)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "26px",
                      height: "26px",
                      borderRadius: "6px",
                      backgroundColor: `${catColor(item.category)}18`,
                      color: catColor(item.category),
                      flexShrink: 0,
                    }}
                  >
                    {getCategoryIcon(item.category)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                    <div className="docs-search-result-meta">
                      <span className="docs-search-result-title">
                        {item.title}
                      </span>
                      <span
                        className="docs-search-cat-badge"
                        style={{
                          backgroundColor: `${catColor(item.category)}18`,
                          color: catColor(item.category),
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <span className="docs-search-result-desc">
                      {item.description}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    style={{
                      opacity: idx === sel ? 0.8 : 0,
                      transition: "opacity 120ms",
                      flexShrink: 0,
                    }}
                  />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="docs-search-footer">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
};
