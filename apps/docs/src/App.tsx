import React, { useState, useEffect } from "react";
import { DocsLayout } from "./components/docs-layout";
import { HomePage } from "./pages/home-page";
import { PlaygroundPage } from "./pages/playground";
import { ComponentPage } from "./pages/component-page";
import { BlockPage } from "./pages/block-page";
import { TemplatePage } from "./pages/template-page";
import { IntroductionPage } from "./pages/guides/introduction-page";
import { ComponentsIndexPage } from "./pages/guides/components-index-page";
import { InstallationPage } from "./pages/guides/installation-page";
import { ChangelogPage } from "./pages/guides/changelog-page";
import { ThemingPage } from "./pages/guides/theming-page";
import { ThemePresetsPage } from "./pages/guides/theme-presets-page";
import { CLIReferencePage } from "./pages/guides/cli-reference-page";
import { NextjsPage } from "./pages/guides/nextjs-page";
import { VitePage } from "./pages/guides/vite-page";
import { LaravelPage } from "./pages/guides/laravel-page";
import { ReactRouterPage } from "./pages/guides/react-router-page";
import { AstroPage } from "./pages/guides/astro-page";
import { ManualPage } from "./pages/guides/manual-page";
import { MigrationPage } from "./pages/guides/migration-page";
import { SkillsPage } from "./pages/guides/skills-page";
import { McpGuidePage } from "./pages/guides/mcp-guide-page";

import { getComponentDoc, getBlockDoc, getTemplateDoc } from "./registry";

function normalizeRoute(route: string): string {
  const r = route.toLowerCase().replace(/\/+$/, "") || "/";

  if (r === "" || r === "/" || r === "/home") return "/";
  if (
    r === "/intro" ||
    r === "/introduction" ||
    r === "/guides/intro" ||
    r === "/guides/introduction" ||
    r === "/docs"
  )
    return "/docs";
  if (
    r === "/components" ||
    r === "/docs/components" ||
    r === "/docs/components/base" ||
    r === "/guide/components" ||
    r === "/guides/components"
  )
    return "/docs/components";
  if (
    r === "/install" ||
    r === "/installation" ||
    r === "/guides/install" ||
    r === "/guides/installation" ||
    r === "/docs/installation"
  )
    return "/docs/installation";
  if (
    r === "/theming" ||
    r === "/themes" ||
    r === "/guides/themes" ||
    r === "/guides/theming" ||
    r === "/docs/theming" ||
    r === "/theme-presets" ||
    r === "/presets" ||
    r === "/guides/presets" ||
    r === "/guides/theme-presets" ||
    r === "/docs/theme-presets"
  )
    return "/docs/theming";
  if (
    r === "/cli" ||
    r === "/cli-reference" ||
    r === "/guides/cli" ||
    r === "/guides/cli-reference" ||
    r === "/docs/cli" ||
    r === "/docs/cli-reference"
  )
    return "/docs/cli";
  if (r === "/skills" || r === "/guides/skills" || r === "/docs/skills") return "/docs/skills";
  if (
    r === "/mcp" ||
    r === "/mcp-guide" ||
    r === "/guides/mcp" ||
    r === "/guides/mcp-guide" ||
    r === "/docs/mcp" ||
    r === "/docs/mcp-guide"
  )
    return "/docs/mcp-guide";
  if (r === "/changelog" || r === "/guides/changelog" || r === "/docs/changelog")
    return "/docs/changelog";
  if (
    r === "/next" ||
    r === "/nextjs" ||
    r === "/guides/next" ||
    r === "/guides/nextjs" ||
    r === "/docs/next" ||
    r === "/docs/nextjs"
  )
    return "/docs/nextjs";
  if (r === "/vite" || r === "/guides/vite" || r === "/docs/vite") return "/docs/vite";
  if (r === "/laravel" || r === "/guides/laravel" || r === "/docs/laravel") return "/docs/laravel";
  if (
    r === "/react-router" ||
    r === "/remix" ||
    r === "/guides/remix" ||
    r === "/guides/react-router" ||
    r === "/docs/remix" ||
    r === "/docs/react-router"
  )
    return "/docs/react-router";
  if (r === "/astro" || r === "/guides/astro" || r === "/docs/astro") return "/docs/astro";
  if (r === "/manual" || r === "/guides/manual" || r === "/docs/manual") return "/docs/manual";
  if (r === "/migration" || r === "/migrate" || r === "/guides/migration" || r === "/docs/migration")
    return "/docs/migration";
  if (r === "/playground" || r === "/theme-builder") return "/playground";
  if (r === "/blocks") return "/blocks/login-form";
  if (r === "/templates") return "/templates/dashboard-page";

  return r;
}

function parsePath(pathString: string, hashString: string): { route: string; anchor?: string } {
  let raw = pathString || "/";
  if (!raw || raw === "") return { route: "/" };

  // Remove query string if any
  const queryIdx = raw.indexOf("?");
  if (queryIdx !== -1) {
    raw = raw.substring(0, queryIdx);
  }

  const normalized = normalizeRoute(raw);

  let anchorPart: string | undefined = undefined;
  if (hashString && hashString.startsWith("#")) {
    anchorPart = hashString.slice(1);
  }

  return anchorPart
    ? { route: normalized, anchor: anchorPart }
    : { route: normalized };
}

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    const parsed = parsePath(window.location.pathname, window.location.hash);
    return parsed.route || "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      const parsed = parsePath(window.location.pathname, window.location.hash);
      if (parsed.route) {
        setCurrentPath(parsed.route);
        if (parsed.anchor) {
          setTimeout(() => {
            const el = document.getElementById(parsed.anchor!);
            if (el) {
              const yOffset = -80;
              const y =
                el.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }, 50);
        }
      } else if (parsed.anchor) {
        // Just an anchor on the current page
        const el = document.getElementById(parsed.anchor);
        if (el) {
          const yOffset = -80;
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith("#")) {
      window.history.pushState(null, "", window.location.pathname + path);
      const anchor = path.slice(1);
      const el = document.getElementById(anchor);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      return;
    }

    const hashIdx = path.indexOf("#");
    let pathname = path;
    let hash = "";
    if (hashIdx !== -1) {
      pathname = path.substring(0, hashIdx);
      hash = path.substring(hashIdx);
    }

    window.history.pushState(null, "", path);
    const parsed = parsePath(pathname, hash);
    if (parsed.route) {
      setCurrentPath(parsed.route);
      if (parsed.anchor) {
        setTimeout(() => {
          const el = document.getElementById(parsed.anchor!);
          if (el) {
            const yOffset = -80;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 50);
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  const renderContent = () => {
    if (currentPath === "/docs") {
      return <IntroductionPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/components") {
      return <ComponentsIndexPage onNavigate={navigate} />;
    }
    if (currentPath === "/playground") {
      return <PlaygroundPage />;
    }
    if (currentPath === "/docs/installation") {
      return <InstallationPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/changelog") {
      return <ChangelogPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/theme-presets") {
      return <ThemePresetsPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/theming") {
      return <ThemingPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/cli") {
      return <CLIReferencePage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/nextjs") {
      return <NextjsPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/vite") {
      return <VitePage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/laravel") {
      return <LaravelPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/react-router") {
      return <ReactRouterPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/astro") {
      return <AstroPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/manual") {
      return <ManualPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/migration") {
      return <MigrationPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/skills") {
      return <SkillsPage onNavigate={navigate} />;
    }
    if (currentPath === "/docs/mcp-guide") {
      return <McpGuidePage onNavigate={navigate} />;
    }

    // Dynamic Component route
    if (currentPath.startsWith("/docs/components/base/")) {
      const compId = currentPath.replace("/docs/components/base/", "");
      const doc = getComponentDoc(compId);
      if (doc) {
        return <ComponentPage doc={doc} onNavigate={navigate} />;
      }
    }

    // Dynamic Block route
    if (currentPath.startsWith("/blocks/")) {
      const blockId = currentPath.replace("/blocks/", "");
      const doc = getBlockDoc(blockId);
      if (doc) {
        return <BlockPage doc={doc} onNavigate={navigate} />;
      }
    }

    // Dynamic Template route
    if (currentPath.startsWith("/templates/")) {
      const templateId = currentPath.replace("/templates/", "");
      const doc = getTemplateDoc(templateId);
      if (doc) {
        return <TemplatePage doc={doc} onNavigate={navigate} />;
      }
    }

    return (
      <div style={{ textAlign: "center", padding: "4rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Page Not Found</h2>
        <p style={{ color: "var(--ui-muted-foreground)" }}>
          The requested documentation page does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "var(--ui-radius)",
            border: "none",
            backgroundColor: "var(--ui-primary)",
            color: "var(--ui-primary-foreground)",
            cursor: "pointer",
          }}
        >
          Return to Introduction
        </button>
      </div>
    );
  };

  // Homepage: rendered OUTSIDE DocsLayout (no sidebar)
  if (currentPath === "/") {
    return <HomePage onNavigate={navigate} />;
  }

  return (
    <DocsLayout currentPath={currentPath} onNavigate={navigate}>
      {renderContent()}
    </DocsLayout>
  );
};
