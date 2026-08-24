import React, { useState } from "react";
import { Copy, Check, ChevronLeft, ChevronRight, Terminal } from "lucide-react";
import { Button } from "@soraui/react";
import { CodeBlock } from "../../components/code-block";

export interface NextjsPageProps {
  onNavigate?: (path: string) => void;
}

export const NextjsPage: React.FC<NextjsPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [tab1, setTab1] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
  const [tab2, setTab2] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
  const [tab3, setTab3] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
  const [tab4, setTab4] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");
  const [tab5, setTab5] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");

  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeStartPoint, setActiveStartPoint] = useState<
    "theme-builder" | "cli" | "existing"
  >("cli");

  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
  };

  const scrollToSection = (
    sectionId: string,
    pointId: "theme-builder" | "cli" | "existing",
  ) => {
    setActiveStartPoint(pointId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleCopyPage = () => {
    const fullText = `# Next.js Installation\n\nInstall and configure Next.js with SoraUI.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const getCmd = (
    type: "init-t" | "add" | "create-next" | "init",
    tab: "pnpm" | "npm" | "yarn" | "bun",
    extra = "",
  ) => {
    if (type === "init-t") {
      switch (tab) {
        case "pnpm":
          return `pnpm dlx @soraui/cli@latest init -t next ${extra}`.trim();
        case "npm":
          return `npx @soraui/cli@latest init -t next ${extra}`.trim();
        case "yarn":
          return `yarn dlx @soraui/cli@latest init -t next ${extra}`.trim();
        case "bun":
          return `bunx --bun @soraui/cli@latest init -t next ${extra}`.trim();
      }
    }
    if (type === "add") {
      switch (tab) {
        case "pnpm":
          return `pnpm dlx @soraui/cli@latest add ${extra}`.trim();
        case "npm":
          return `npx @soraui/cli@latest add ${extra}`.trim();
        case "yarn":
          return `yarn dlx @soraui/cli@latest add ${extra}`.trim();
        case "bun":
          return `bunx --bun @soraui/cli@latest add ${extra}`.trim();
      }
    }
    if (type === "create-next") {
      switch (tab) {
        case "pnpm":
          return "pnpm create next-app@latest my-app --typescript --eslint --app";
        case "npm":
          return "npx create-next-app@latest my-app --typescript --eslint --app";
        case "yarn":
          return "yarn create next-app my-app --typescript --eslint --app";
        case "bun":
          return "bun create next-app my-app --typescript --eslint --app";
      }
    }
    if (type === "init") {
      switch (tab) {
        case "pnpm":
          return "pnpm dlx @soraui/cli@latest init";
        case "npm":
          return "npx @soraui/cli@latest init";
        case "yarn":
          return "yarn dlx @soraui/cli@latest init";
        case "bun":
          return "bunx --bun @soraui/cli@latest init";
      }
    }
    return "";
  };

  return (
    <article className="docs-page sora-intro-manifesto">
      {/* ─── HEADER ─── */}
      <header className="docs-intro-header">
        <div className="docs-intro-header-top">
          <h1 className="docs-intro-title">Next.js</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-copy-page-btn"
              onClick={handleCopyPage}
              title="Copy page markdown"
            >
              {copied ? (
                <>
                  <Check size={13} style={{ color: "#22c55e" }} />
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
                onClick={() => go("/guides/installation")}
                title="Previous: Installation"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go("/guides/vite")}
                title="Next: Vite"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          Install and configure Next.js with SoraUI.
        </p>
      </header>

      {/* ─── STARTING CARDS ─── */}
      <div
        className="docs-intro-statement"
        style={{ margin: "1rem 0 0.875rem" }}
      >
        Choose the setup that matches your starting point.
      </div>

      <div className="docs-install-start-grid">
        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === "theme-builder" ? " active" : ""}`}
          onClick={() => scrollToSection("use-theme-builder", "theme-builder")}
        >
          <div className="docs-install-start-title">Use Theme Builder</div>
          <div className="docs-install-start-sub">
            Build your preset visually, preview your choices, and generate a
            setup command.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === "cli" ? " active" : ""}`}
          onClick={() => scrollToSection("use-the-cli", "cli")}
        >
          <div className="docs-install-start-title">Use the CLI</div>
          <div className="docs-install-start-sub">
            Scaffold a supported template directly from the terminal.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === "existing" ? " active" : ""}`}
          onClick={() => scrollToSection("existing-project", "existing")}
        >
          <div className="docs-install-start-title">Existing Project</div>
          <div className="docs-install-start-sub">
            Add SoraUI to an app you already created.
          </div>
        </button>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          METHOD 1: USE THEME BUILDER
          ═════════════════════════════════════════════════════════════════════ */}
      <section
        className="docs-intro-section"
        id="use-theme-builder"
        style={{ marginTop: "2.5rem" }}
      >
        <h2 className="docs-intro-h2">
          <span>Use Theme Builder</span>
          <a
            href="#use-theme-builder"
            className="docs-intro-anchor"
            aria-hidden
          >
            #
          </a>
        </h2>

        <div className="docs-step-flow">
          {/* Step 1 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">1</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Build Your Preset</h3>
              <p className="docs-step-flow-desc">
                Build your preset visually, preview your choices, and generate a
                framework-specific setup command.
              </p>
              <div style={{ marginTop: "0.625rem" }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => go("/playground")}
                  style={{ fontWeight: 600 }}
                >
                  Open Theme Builder
                </Button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">2</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Create Project</h3>
              <p className="docs-step-flow-desc">
                Run the command generated by Theme Builder to create your
                project and configure all dependencies:
              </p>
              <div className="docs-tabbed-codeblock">
                <div className="docs-tabbed-codeblock-header">
                  <div className="docs-tabbed-codeblock-tabs">
                    {(["pnpm", "npm", "yarn", "bun"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`docs-tabbed-codeblock-tab${tab1 === tab ? " active" : ""}`}
                        onClick={() => setTab1(tab)}
                      >
                        <Terminal size={12} style={{ opacity: 0.7 }} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() => copyText(getCmd("init-t", tab1), "cmd1")}
                  >
                    {copiedCmd === "cmd1" ? (
                      <Check size={13} style={{ color: "#22c55e" }} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd("init-t", tab1)}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">3</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Add Components</h3>
              <p className="docs-step-flow-desc">
                Add the components you need to your project:
              </p>
              <div className="docs-tabbed-codeblock">
                <div className="docs-tabbed-codeblock-header">
                  <div className="docs-tabbed-codeblock-tabs">
                    {(["pnpm", "npm", "yarn", "bun"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`docs-tabbed-codeblock-tab${tab2 === tab ? " active" : ""}`}
                        onClick={() => setTab2(tab)}
                      >
                        <Terminal size={12} style={{ opacity: 0.7 }} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() =>
                      copyText(
                        getCmd("add", tab2, "button card dialog"),
                        "cmd2",
                      )
                    }
                  >
                    {copiedCmd === "cmd2" ? (
                      <Check size={13} style={{ color: "#22c55e" }} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd("add", tab2, "button card dialog")}</code>
                </pre>
              </div>

              <p
                className="docs-step-flow-desc"
                style={{ marginTop: "0.875rem" }}
              >
                Import the component in your <code>app/page.tsx</code>:
              </p>
              <CodeBlock
                language="tsx"
                filename="app/page.tsx"
                code={`import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Button>Click me</Button>
    </div>
  );
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          METHOD 2: USE THE CLI
          ═════════════════════════════════════════════════════════════════════ */}
      <section
        className="docs-intro-section"
        id="use-the-cli"
        style={{ marginTop: "3rem" }}
      >
        <h2 className="docs-intro-h2">
          <span>Use the CLI</span>
          <a href="#use-the-cli" className="docs-intro-anchor" aria-hidden>
            #
          </a>
        </h2>

        <div className="docs-step-flow">
          {/* Step 1 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">1</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Create Project</h3>
              <p className="docs-step-flow-desc">
                Run the following command to initialize a new Next.js project
                with SoraUI:
              </p>
              <div className="docs-tabbed-codeblock">
                <div className="docs-tabbed-codeblock-header">
                  <div className="docs-tabbed-codeblock-tabs">
                    {(["pnpm", "npm", "yarn", "bun"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`docs-tabbed-codeblock-tab${tab3 === tab ? " active" : ""}`}
                        onClick={() => setTab3(tab)}
                      >
                        <Terminal size={12} style={{ opacity: 0.7 }} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() => copyText(getCmd("init-t", tab3), "cmd3")}
                  >
                    {copiedCmd === "cmd3" ? (
                      <Check size={13} style={{ color: "#22c55e" }} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd("init-t", tab3)}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">2</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Add Components</h3>
              <p className="docs-step-flow-desc">
                Add the components you need to your project:
              </p>
              <div className="docs-tabbed-codeblock">
                <div className="docs-tabbed-codeblock-header">
                  <div className="docs-tabbed-codeblock-tabs">
                    {(["pnpm", "npm", "yarn", "bun"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`docs-tabbed-codeblock-tab${tab4 === tab ? " active" : ""}`}
                        onClick={() => setTab4(tab)}
                      >
                        <Terminal size={12} style={{ opacity: 0.7 }} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() =>
                      copyText(getCmd("add", tab4, "button"), "cmd4")
                    }
                  >
                    {copiedCmd === "cmd4" ? (
                      <Check size={13} style={{ color: "#22c55e" }} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd("add", tab4, "button")}</code>
                </pre>
              </div>

              <p
                className="docs-step-flow-desc"
                style={{ marginTop: "0.875rem" }}
              >
                You can now start using the Button component in your project:
              </p>
              <CodeBlock
                language="tsx"
                filename="app/page.tsx"
                code={`import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Button>Click me</Button>
    </div>
  );
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          METHOD 3: EXISTING PROJECT
          ═════════════════════════════════════════════════════════════════════ */}
      <section
        className="docs-intro-section"
        id="existing-project"
        style={{ marginTop: "3rem" }}
      >
        <h2 className="docs-intro-h2">
          <span>Existing Project</span>
          <a href="#existing-project" className="docs-intro-anchor" aria-hidden>
            #
          </a>
        </h2>

        <div className="docs-step-flow">
          {/* Step 1 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">1</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Create Project</h3>
              <p className="docs-step-flow-desc">
                If you don't have an existing Next.js project, you can create
                one with <code>create-next-app</code>:
              </p>
              <div className="docs-tabbed-codeblock">
                <div className="docs-tabbed-codeblock-header">
                  <div className="docs-tabbed-codeblock-tabs">
                    {(["pnpm", "npm", "yarn", "bun"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`docs-tabbed-codeblock-tab${tab5 === tab ? " active" : ""}`}
                        onClick={() => setTab5(tab)}
                      >
                        <Terminal size={12} style={{ opacity: 0.7 }} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() =>
                      copyText(getCmd("create-next", tab5), "cmd5")
                    }
                  >
                    {copiedCmd === "cmd5" ? (
                      <Check size={13} style={{ color: "#22c55e" }} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd("create-next", tab5)}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">2</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">
                Configure tsconfig.json Paths
              </h3>
              <p className="docs-step-flow-desc">
                Ensure your <code>tsconfig.json</code> contains baseUrl and
                paths mapping:
              </p>
              <CodeBlock
                language="json"
                filename="tsconfig.json"
                code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}`}
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">3</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Run the CLI</h3>
              <p className="docs-step-flow-desc">
                Run the <code>@soraui/cli</code> init command to configure your
                existing project:
              </p>
              <div className="docs-tabbed-codeblock">
                <div className="docs-tabbed-codeblock-header">
                  <div className="docs-tabbed-codeblock-tabs">
                    {(["pnpm", "npm", "yarn", "bun"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`docs-tabbed-codeblock-tab${tab5 === tab ? " active" : ""}`}
                        onClick={() => setTab5(tab)}
                      >
                        <Terminal size={12} style={{ opacity: 0.7 }} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() => copyText(getCmd("init", tab5), "cmd6")}
                  >
                    {copiedCmd === "cmd6" ? (
                      <Check size={13} style={{ color: "#22c55e" }} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd("init", tab5)}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">4</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Add Components</h3>
              <p className="docs-step-flow-desc">
                You can now add components to your project:
              </p>
              <div className="docs-tabbed-codeblock">
                <div className="docs-tabbed-codeblock-header">
                  <div className="docs-tabbed-codeblock-tabs">
                    {(["pnpm", "npm", "yarn", "bun"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`docs-tabbed-codeblock-tab${tab5 === tab ? " active" : ""}`}
                        onClick={() => setTab5(tab)}
                      >
                        <Terminal size={12} style={{ opacity: 0.7 }} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() =>
                      copyText(getCmd("add", tab5, "button"), "cmd7")
                    }
                  >
                    {copiedCmd === "cmd7" ? (
                      <Check size={13} style={{ color: "#22c55e" }} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd("add", tab5, "button")}</code>
                </pre>
              </div>

              <p
                className="docs-step-flow-desc"
                style={{ marginTop: "0.875rem" }}
              >
                Use the component in your <code>app/page.tsx</code>:
              </p>
              <CodeBlock
                language="tsx"
                filename="app/page.tsx"
                code={`import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Button>Click me</Button>
    </div>
  );
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination">
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => go("/guides/installation")}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">Installation</span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => go("/guides/vite")}
        >
          <div
            className="docs-intro-pagination-text"
            style={{ textAlign: "right" }}
          >
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">Vite Setup</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
