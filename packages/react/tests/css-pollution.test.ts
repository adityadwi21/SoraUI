import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Phase 10.5C — CSS Global Pollution & Namespacing Audit", () => {
  const distCssPath = path.resolve(__dirname, "../dist/styles.css");

  it("compiled stylesheet exists", () => {
    expect(fs.existsSync(distCssPath), "dist/styles.css must exist").toBe(true);
  });

  it("contains 0 bare global element selectors that would pollute consumer apps", () => {
    const css = fs.readFileSync(distCssPath, "utf8");

    // Remove comments
    const cleanCss = css.replace(/\/\*[\s\S]*?\*\//g, "");

    // Extract all CSS rules (excluding @keyframes and @media container headers)
    const ruleHeaders = cleanCss
      .split("{")
      .map((chunk) => chunk.trim())
      .filter(
        (chunk) =>
          chunk.length > 0 &&
          !chunk.startsWith("@keyframes") &&
          !chunk.startsWith("@media"),
      );

    // Forbidden bare tag selectors (e.g. "body", "button", "input", "textarea", "select", "*", "a", "p", "h1")
    const forbiddenTags = new Set([
      "body",
      "button",
      "input",
      "textarea",
      "select",
      "*",
      "a",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
    ]);

    for (const header of ruleHeaders) {
      // Get the last selector block if chunk has nested blocks
      const lastLine = header.split(";").pop()?.split("}").pop()?.trim() || "";
      if (!lastLine || lastLine.startsWith("@")) continue;

      const selectors = lastLine
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      for (const sel of selectors) {
        // A bare tag selector is an unadorned HTML tag without . or [ or # or :
        const isBareTag = forbiddenTags.has(sel);
        expect(
          isBareTag,
          `Bare tag selector "${sel}" found in CSS header: "${header}"`,
        ).toBe(false);
      }
    }
  });

  it("all component styles are properly namespaced under .sora-*, [data-theme], [data-sora], or :root", () => {
    const css = fs.readFileSync(distCssPath, "utf8");
    const cleanCss = css.replace(/\/\*[\s\S]*?\*\//g, "");

    const ruleHeaders = cleanCss
      .split("{")
      .map((chunk) => chunk.trim())
      .filter(
        (chunk) =>
          chunk.length > 0 &&
          !chunk.startsWith("@keyframes") &&
          !chunk.startsWith("@media") &&
          !chunk.startsWith("@supports") &&
          !chunk.startsWith("@container"),
      );

    for (const header of ruleHeaders) {
      const lastLine =
        header
          .split(";")
          .pop()
          ?.split("}")
          .pop()
          ?.trim()
          .replace(/\s+/g, " ") || "";
      if (
        !lastLine ||
        lastLine.startsWith("@") ||
        lastLine.startsWith("from") ||
        lastLine.startsWith("to") ||
        /^\d+%/.test(lastLine)
      )
        continue;

      const selectors = lastLine
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      for (const s of selectors) {
        const isAllowed =
          s.startsWith(".sora-") ||
          s.includes(".sora-") ||
          s.startsWith("[data-theme") ||
          s.startsWith("[data-sora") ||
          s.startsWith(":root") ||
          s.startsWith(":host");

        expect(
          isAllowed,
          `Selector "${s}" must be namespaced with .sora- or [data-theme]`,
        ).toBe(true);
      }
    }
  });
});
