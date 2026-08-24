import React, { useState } from 'react';
import {
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

export interface IntroductionPageProps {
  onNavigate: (path: string) => void;
}

export const IntroductionPage: React.FC<IntroductionPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  const handleCopyPage = () => {
    const fullText = `# Introduction\n\nSoraUI is a set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks and AI models. Open Source. Open Code.\n\nThis is not a component library. It is how you build your component library.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="docs-page sora-intro-manifesto">
      {/* ─── PAGE HEADER ─── */}
      <header className="docs-intro-header">
        <div className="docs-intro-header-top">
          <h1 className="docs-intro-title">Introduction</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-copy-page-btn"
              onClick={handleCopyPage}
              title="Copy page markdown"
            >
              {copied ? (
                <>
                  <Check size={13} style={{ color: '#22c55e' }} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Page</span>
                </>
              )}
            </button>

            <div className="docs-intro-nav-arrows">
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => onNavigate('/')}
                title="Previous: Home"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => onNavigate('/guides/installation')}
                title="Next: Installation"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          SoraUI is a set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks and AI models. Open Source. Open Code.
        </p>
      </header>

      {/* ─── MANIFESTO SUBHEAD ─── */}
      <div className="docs-intro-statement">
        <strong>This is not a component library. It is how you build your component library.</strong>
      </div>

      <div className="docs-intro-body">
        <p>
          You know how most traditional component libraries work: you install a package from NPM, import the components, and use them in your app.
        </p>

        <p>
          This approach works well until you need to customize a component to fit your design system or require one that isn't included in the library. <strong>Often, you end up wrapping library components, writing workarounds to override styles, or mixing components from different libraries with incompatible APIs.</strong>
        </p>

        <p>
          This is what SoraUI aims to solve. It is built around the following principles:
        </p>

        <ul className="docs-intro-principles-list">
          <li>
            <strong>Open Code:</strong> The top layer of your component code is open for modification.
          </li>
          <li>
            <strong>Composition:</strong> Every component uses a common, composable interface, making them predictable.
          </li>
          <li>
            <strong>Distribution:</strong> A flat-file schema and command-line tool make it easy to distribute components.
          </li>
          <li>
            <strong>Beautiful Defaults:</strong> Carefully chosen default styles, so you get great design out-of-the-box.
          </li>
          <li>
            <strong>AI-Ready:</strong> Open code for LLMs to read, understand, and improve.
          </li>
        </ul>

        {/* ─── SECTION 1: OPEN CODE ─── */}
        <section className="docs-intro-section">
          <h2 id="open-code" className="docs-intro-h2">
            <span>Open Code</span>
            <a href="#open-code" className="docs-intro-anchor" aria-hidden>#</a>
          </h2>

          <p>
            SoraUI hands you the actual component code. You have full control to customize and extend the components to your needs. This means:
          </p>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>Full Transparency:</strong> You see exactly how each component is built.
            </li>
            <li>
              <strong>Easy Customization:</strong> Modify any part of a component to fit your design and functionality requirements.
            </li>
            <li>
              <strong>AI Integration:</strong> Access to the code makes it straightforward for LLMs to read, understand, and even improve your components.
            </li>
          </ul>

          <p className="docs-intro-note">
            <em>
              In a typical library, if you need to change a button's behavior, you have to override styles or wrap the component. With SoraUI, you simply edit the button code directly.
            </em>
          </p>

          {/* Accordion FAQ in Open Code */}
          <div className="docs-intro-faq">
            <button
              type="button"
              className={`docs-intro-faq-trigger${faqOpen ? ' open' : ''}`}
              onClick={() => setFaqOpen((prev) => !prev)}
              aria-expanded={faqOpen}
            >
              <span>How do I pull upstream updates in an Open Code approach?</span>
              <ChevronDown
                size={16}
                className="docs-intro-faq-chevron"
                style={{
                  transform: faqOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--docs-transition-fast)',
                }}
              />
            </button>
            {faqOpen && (
              <div className="docs-intro-faq-content">
                <p>
                  Because components live directly in your repository as pure TypeScript and CSS custom properties, you can update them using the SoraUI CLI (<code>npx @soraui/cli add [component] --overwrite</code>) or review updates via standard git diffs. You maintain 100% ownership of what gets merged.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 2: COMPOSITION ─── */}
        <section className="docs-intro-section">
          <h2 id="composition" className="docs-intro-h2">
            <span>Composition</span>
            <a href="#composition" className="docs-intro-anchor" aria-hidden>#</a>
          </h2>

          <p>
            Every component in SoraUI shares a common, composable interface. <strong>If a component does not exist, we bring it in, make it composable, and adjust its style to match and work with the rest of the design system.</strong>
          </p>

          <p className="docs-intro-note">
            <em>
              A shared, composable interface means it's predictable for both your team and LLMs. You are not learning different APIs for every new component. Even for third party ones.
            </em>
          </p>
        </section>

        {/* ─── SECTION 3: DISTRIBUTION ─── */}
        <section className="docs-intro-section">
          <h2 id="distribution" className="docs-intro-h2">
            <span>Distribution</span>
            <a href="#distribution" className="docs-intro-anchor" aria-hidden>#</a>
          </h2>

          <p>
            SoraUI is also a code distribution system. It defines a schema for components and a CLI to distribute them.
          </p>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>Schema:</strong> A flat-file structure (<code>registry.json</code>) that defines the components, their dependencies, and properties.
            </li>
            <li>
              <strong>CLI:</strong> A command-line tool to distribute and install components across projects with cross-framework support.
            </li>
          </ul>

          <p className="docs-intro-note">
            <em>
              You can use the schema to distribute your components to other projects or have AI generate completely new components based on existing schema.
            </em>
          </p>
        </section>

        {/* ─── SECTION 4: BEAUTIFUL DEFAULTS ─── */}
        <section className="docs-intro-section">
          <h2 id="beautiful-defaults" className="docs-intro-h2">
            <span>Beautiful Defaults</span>
            <a href="#beautiful-defaults" className="docs-intro-anchor" aria-hidden>#</a>
          </h2>

          <p>
            SoraUI comes with 44 components, 14 production blocks, and 9 curated theme presets (Sky, Cloud, Horizon, Aurora, Twilight, Midnight, Nebula, Eclipse, Starlight) that have carefully chosen default styles. They are designed to look good on their own and to work well together as a consistent system:
          </p>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>Good Out-of-the-Box:</strong> Your UI has a clean and minimal look without extra work.
            </li>
            <li>
              <strong>Unified Design:</strong> Components naturally fit with one another. Each component is built to match the others, keeping your UI consistent.
            </li>
            <li>
              <strong>Easily Customizable:</strong> If you want to change something, it's simple to override and extend the defaults.
            </li>
          </ul>
        </section>

        {/* ─── SECTION 5: AI-READY ─── */}
        <section className="docs-intro-section">
          <h2 id="ai-ready" className="docs-intro-h2">
            <span>AI-Ready</span>
            <a href="#ai-ready" className="docs-intro-anchor" aria-hidden>#</a>
          </h2>

          <p>
            The design of SoraUI makes it easy for AI tools to work with your code. Its open code and consistent API allow AI models to read, understand, and even generate new components.
          </p>

          <p className="docs-intro-note">
            <em>
              An AI model can learn how your components work and suggest improvements or even create new components that integrate with your existing design.
            </em>
          </p>
        </section>
      </div>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination">
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => onNavigate('/components/typography')}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">Typography</span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => onNavigate('/guides/installation')}
        >
          <div className="docs-intro-pagination-text" style={{ textAlign: 'right' }}>
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">Installation</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
