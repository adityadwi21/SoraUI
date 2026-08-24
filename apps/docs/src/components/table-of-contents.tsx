import React, { useEffect, useState } from 'react';
import { ArrowUp, Bug, ExternalLink } from 'lucide-react';
import { GitHubIcon } from './brand-icons';

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface TableOfContentsProps {
  currentPath: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ currentPath }) => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Scan the page for h2 and h3 elements with IDs
    const timer = setTimeout(() => {
      const mainEl = document.getElementById('main-content');
      if (!mainEl) return;

      const elements = Array.from(mainEl.querySelectorAll('h2[id], h3[id]'));
      const items: TocItem[] = elements.map((el) => ({
        id: el.id,
        title: (el.querySelector('span') || el).textContent?.replace('#', '').trim() || el.id,
        level: el.tagName === 'H2' ? 2 : 3,
      }));

      setHeadings(items);
      if (items.length > 0 && items[0]) {
        setActiveId(items[0].id);
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [currentPath]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActiveId(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (headings.length === 0) {
    return null;
  }

  // Derive github edit link
  const getGithubLink = () => {
    if (currentPath.startsWith('/components/')) {
      const id = currentPath.replace('/components/', '');
      return `https://github.com/adityadwi21/SoraUI/tree/main/packages/react/src/components/${id}`;
    }
    if (currentPath.startsWith('/blocks/')) {
      const id = currentPath.replace('/blocks/', '');
      return `https://github.com/adityadwi21/SoraUI/tree/main/packages/react/src/blocks/${id}`;
    }
    return `https://github.com/adityadwi21/SoraUI/tree/main/apps/docs`;
  };

  return (
    <aside className="docs-toc" aria-label="Table of contents">
      <div className="docs-toc-inner">
        <div className="docs-toc-title">On This Page</div>
        <nav className="docs-toc-nav">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <button
                key={h.id}
                type="button"
                className={`docs-toc-link lvl-${h.level}${isActive ? ' active' : ''}`}
                onClick={() => scrollTo(h.id)}
              >
                {h.title}
              </button>
            );
          })}
        </nav>

        <div className="docs-toc-divider" />

        {/* Quick Links */}
        <div className="docs-toc-footer">
          <a
            href={getGithubLink()}
            target="_blank"
            rel="noreferrer"
            className="docs-toc-footer-link"
          >
            <GitHubIcon size={13} />
            <span>Edit this page on GitHub</span>
            <ExternalLink size={11} style={{ opacity: 0.6, flexShrink: 0 }} />
          </a>

          <a
            href="https://github.com/adityadwi21/SoraUI/issues/new"
            target="_blank"
            rel="noreferrer"
            className="docs-toc-footer-link"
          >
            <Bug size={13} style={{ flexShrink: 0 }} />
            <span>Report an issue</span>
            <ExternalLink size={11} style={{ opacity: 0.6, flexShrink: 0 }} />
          </a>

          <button
            type="button"
            className="docs-toc-footer-link docs-toc-btn-top"
            onClick={scrollToTop}
          >
            <ArrowUp size={13} style={{ flexShrink: 0 }} />
            <span>Scroll to top</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
