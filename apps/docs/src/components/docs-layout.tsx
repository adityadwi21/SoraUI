import React, { useState, useEffect, useCallback } from "react";
import { Sun, Moon, Menu, X, Search } from "lucide-react";
import { GitHubIcon } from "./brand-icons";
import { COMPONENT_DOCS } from "../registry/components";
import { BLOCK_DOCS } from "../registry/blocks";
import { TEMPLATE_DOCS } from "../registry/templates";
import { GUIDE_DOCS } from "../registry/guides";
import { SearchDialog } from "./search-dialog";
import { TableOfContents } from "./table-of-contents";
import { useDocsTheme } from "../registry/docs-theme-context";


/* ─────────────────────────────────────────────────────
   SVG Icons
───────────────────────────────────────────────────── */

const Npm = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: 14, height: 14 }}
  >
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
  </svg>
);

/* ─────────────────────────────────────────────────────
   SidebarContent: shared between desktop + drawer
───────────────────────────────────────────────────── */
const SidebarContent: React.FC<{
  currentPath: string;
  onNav: (p: string) => void;
  onClose?: () => void;
}> = ({ currentPath, onNav, onClose }) => {
  const go = (p: string) => {
    onNav(p);
    onClose?.();
  };
  const isIntro =
    currentPath === "/" ||
    currentPath === "" ||
    currentPath === "/guides/introduction";

  return (
    <nav className="docs-sidebar-nav" aria-label="Documentation navigation">
      {/* Getting Started */}
      <div className="docs-sb-section">
        <div className="docs-sb-label">Getting Started</div>
        <div className="docs-sb-group">
          {GUIDE_DOCS.map((g) => {
            const href =
              g.customPath ||
              (g.id === "introduction" ? "/docs" : 
               g.id === "cli-reference" ? "/docs/cli" : 
               g.id === "components" ? "/docs/components" : 
               `/docs/${g.id}`);
            const active =
              currentPath === href || (g.id === "introduction" && isIntro);
            return (
              <button
                key={g.id}
                type="button"
                className={`docs-sb-item${active ? " active" : ""}`}
                onClick={() => go(href)}
              >
                <span>{g.title}</span>
                {g.hasDotBadge ? (
                  <span className="docs-sb-dot-blue" aria-hidden />
                ) : (
                  <span className="docs-sb-item-dot" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Frameworks */}
      <div className="docs-sb-section">
        <div className="docs-sb-label">Frameworks</div>
        <div className="docs-sb-group">
          {[
            { id: "nextjs", title: "Next.js", href: "/docs/nextjs" },
            { id: "vite", title: "Vite", href: "/docs/vite" },
            { id: "laravel", title: "Laravel", href: "/docs/laravel" },
            {
              id: "react-router",
              title: "React Router",
              href: "/docs/react-router",
            },
            { id: "astro", title: "Astro", href: "/docs/astro" },
            { id: "manual", title: "Manual", href: "/docs/manual" },
          ].map((f) => {
            const active = currentPath === f.href;
            return (
              <button
                key={f.id}
                type="button"
                className={`docs-sb-item${active ? " active" : ""}`}
                onClick={() => go(f.href)}
              >
                <span>{f.title}</span>
                <span className="docs-sb-item-dot" aria-hidden />
              </button>
            );
          })}
        </div>
      </div>

      {/* Components */}
      <div className="docs-sb-section">
        <div className="docs-sb-label">
          <span>Components</span>
          <span className="docs-sb-chip">{COMPONENT_DOCS.length}</span>
        </div>
        <div className="docs-sb-group">
          {[...COMPONENT_DOCS]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => {
              const href = `/docs/components/base/${c.id}`;
              const active = currentPath === href;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`docs-sb-item${active ? " active" : ""}`}
                  onClick={() => go(href)}
                >
                  <span>{c.name}</span>
                  {c.status === "experimental" && (
                    <span className="docs-sb-badge docs-sb-badge--beta">
                      Exp
                    </span>
                  )}
                  <span className="docs-sb-item-dot" aria-hidden />
                </button>
              );
            })}
        </div>
      </div>

      {/* Blocks */}
      <div className="docs-sb-section">
        <div className="docs-sb-label">
          <span>Blocks</span>
          <span className="docs-sb-chip">{BLOCK_DOCS.length}</span>
        </div>
        <div className="docs-sb-group">
          {BLOCK_DOCS.map((b) => {
            const href = `/blocks/${b.id}`;
            const active = currentPath === href;
            return (
              <button
                key={b.id}
                type="button"
                className={`docs-sb-item${active ? " active" : ""}`}
                onClick={() => go(href)}
              >
                <span>{b.name}</span>
                <span className="docs-sb-item-dot" aria-hidden />
              </button>
            );
          })}
        </div>
      </div>

      {/* Templates */}
      <div className="docs-sb-section">
        <div className="docs-sb-label">
          <span>Templates</span>
          <span className="docs-sb-chip">{TEMPLATE_DOCS.length}</span>
        </div>
        <div className="docs-sb-group">
          {TEMPLATE_DOCS.map((t) => {
            const href = `/templates/${t.id}`;
            const active = currentPath === href;
            return (
              <button
                key={t.id}
                type="button"
                className={`docs-sb-item${active ? " active" : ""}`}
                onClick={() => go(href)}
              >
                <span>{t.name}</span>
                <span className="docs-sb-item-dot" aria-hidden />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

/* ─────────────────────────────────────────────────────
   DocsLayout
───────────────────────────────────────────────────── */
export interface DocsLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({
  currentPath,
  onNavigate,
  children,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggle } = useDocsTheme();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [currentPath]);

  // Close drawer on resize
  useEffect(() => {
    const h = () => {
      if (window.innerWidth > 768) setDrawerOpen(false);
    };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  // Keyboard: Cmd+K
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  const isHome = currentPath === "/" || currentPath === "";
  const isComp =
    currentPath.startsWith("/docs/components") ||
    currentPath.startsWith("/components");
  const isBlock = currentPath.startsWith("/blocks");
  const isTemplate = currentPath.startsWith("/templates");
  const isPlay = currentPath === "/playground";
  const isGuide = !isHome && !isComp && !isBlock && !isTemplate && !isPlay;

  return (
    <div className="docs-root" data-docs-theme={mode}>
      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={onNavigate}
      />

      {/* ─── HEADER ─── */}
      <header className="docs-header">
        <div className="docs-header-inner">
          <div className="docs-header-left">
            {/* Hamburger (mobile only) */}
            <button
              type="button"
              className="docs-mobile-btn"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Logo */}
            <button
              type="button"
              className="docs-logo"
              onClick={() => onNavigate("/")}
              aria-label="SoraUI home"
            >
              <img
                src={
                  mode === "dark"
                    ? "/Logo-full-removebg.png"
                    : "/Logo-full-removebg-light.png"
                }
                alt="SoraUI"
                style={{
                  height: 48,
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <span className="docs-logo-chip">v0.1.1</span>
            </button>
          </div>

          {/* Center nav */}
          <nav className="docs-header-mid docs-top-nav" aria-label="Main nav">
            {(
              [
                { label: "Home", active: isHome, path: "/" },
                {
                  label: "Docs",
                  active: isGuide,
                  path: "/docs",
                },
                { label: "Components", active: isComp, path: "/docs/components" },
                {
                  label: "Blocks",
                  active: isBlock,
                  path: "/blocks/login-form",
                },
                {
                  label: "Templates",
                  active: isTemplate,
                  path: "/templates/dashboard-page",
                },
                { label: "Playground", active: isPlay, path: "/playground" },
              ] as const
            ).map((n) => (
              <button
                key={n.label}
                type="button"
                className={`docs-nav-link${n.active ? " active" : ""}`}
                onClick={() => onNavigate(n.path)}
              >
                {n.label}
              </button>
            ))}
          </nav>

          {/* Right tools */}
          <div className="docs-header-right">
            {/* Search */}
            <button
              type="button"
              id="docs-search-trigger"
              className="docs-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={14} style={{ flexShrink: 0 }} />
              <span className="docs-search-btn-text">
                Search documentation...
              </span>
              <kbd className="docs-search-kbd">⌘K</kbd>
            </button>

            {/* Dark mode toggle */}
            <button
              type="button"
              id="docs-dark-toggle"
              className="docs-icon-btn"
              onClick={toggle}
              title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
              aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
            >
              {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* GitHub */}
            <a
              id="docs-github"
              href="https://github.com/adityadwi21/SoraUI"
              target="_blank"
              rel="noreferrer"
              className="docs-icon-btn"
              title="GitHub"
              aria-label="GitHub"
            >
              <GitHubIcon size={15} />
            </a>

            {/* NPM */}
            <a
              id="docs-npm"
              href="https://www.npmjs.com/package/@soraui/core"
              target="_blank"
              rel="noreferrer"
              className="docs-icon-btn"
              title="NPM"
              aria-label="NPM"
            >
              <Npm />
            </a>
          </div>
        </div>
      </header>

      {/* ─── BODY CONTAINER ─── */}
      <div className="docs-body-wrapper">
        <div className="docs-body">
          {/* Desktop sidebar */}
          <aside className="docs-sidebar" aria-label="Sidebar">
            <SidebarContent currentPath={currentPath} onNav={onNavigate} />
          </aside>

          {/* Mobile overlay */}
          {drawerOpen && (
            <div
              className="docs-overlay"
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
          )}

          {/* Mobile drawer */}
          <aside
            className={`docs-drawer${drawerOpen ? " open" : ""}`}
            aria-label="Mobile navigation"
            aria-hidden={!drawerOpen}
          >
            <SidebarContent
              currentPath={currentPath}
              onNav={onNavigate}
              onClose={() => setDrawerOpen(false)}
            />
          </aside>

          {/* Center Main content */}
          <main className="docs-main" id="main-content">
            <div className="docs-main-container">{children}</div>
          </main>

          {/* Right Table of Contents (On this page) */}
          <TableOfContents currentPath={currentPath} />
        </div>
      </div>
    </div>
  );
};
