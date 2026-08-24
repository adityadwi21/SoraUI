/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import * as esbuild from "esbuild";
import { join } from "path";

describe("Tree-Shaking Verification (esbuild)", () => {
  it("bundles only Button when consumer imports only Button", async () => {
    const distPath = join(__dirname, "../dist/index.js").replace(/\\/g, "/");
    const entryCode = `
      import { Button } from '${distPath}';
      console.log(Button);
    `;

    const result = await esbuild.build({
      stdin: {
        contents: entryCode,
        resolveDir: join(__dirname, ".."),
        loader: "js",
      },
      bundle: true,
      minify: true,
      treeShaking: true,
      format: "esm",
      external: ["react", "react-dom", "@soraui/core", "@soraui/hooks"],
      write: false,
    });

    const outputText = result.outputFiles?.[0]?.text ?? "";
    const bundleSizeBytes = result.outputFiles?.[0]?.contents?.byteLength ?? 0;

    // Must include Button
    expect(outputText).toContain("sora-button");

    // Must NOT include unused Level 2 & 3 components
    expect(outputText).not.toContain("sora-dialog");
    expect(outputText).not.toContain("sora-select");
    expect(outputText).not.toContain("sora-tooltip");
    expect(outputText).not.toContain("sora-calendar");
    expect(outputText).not.toContain("sora-data-table");

    // Tree-shaken button alone should be tiny (< 5 KB minified)
    expect(bundleSizeBytes).toBeLessThan(5000);
  });
});
