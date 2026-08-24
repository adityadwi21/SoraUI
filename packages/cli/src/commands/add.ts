import { Command } from "commander";
import pc from "picocolors";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { getConfig } from "../utils/config";
import {
  ALL_COMPONENTS,
  ALL_BLOCKS,
  ALL_THEMES,
  resolveDependencies,
  getComponentCode,
  getBlockCode,
  getThemeCSS,
} from "../utils/registry";

export const addCommand = new Command("add")
  .description(
    "Add components, blocks, or themes to your project from the canonical registry",
  )
  .argument(
    "[target...]",
    'Component names (e.g. button, dialog), or "block <id>", or "theme <id>"',
  )
  .option("-o, --overwrite", "Overwrite existing files if present", false)
  .option("-d, --dry-run", "Preview changes without writing to disk", false)
  .action(async (targets: string[] = [], options) => {
    if (!targets || targets.length === 0) {
      console.log(
        pc.yellow(
          "\n  Please specify one or more components, a block, or a theme to add.",
        ),
      );
      console.log(pc.dim("  Examples:"));
      console.log(pc.dim("    npx soraui add button input card"));
      console.log(pc.dim("    npx soraui add block login-form"));
      console.log(pc.dim("    npx soraui add theme midnight\n"));
      return;
    }

    const config = await getConfig();
    const isDryRun = !!options.dryRun;

    if (isDryRun) {
      console.log(
        pc.yellow(
          "\n  🔍 Running in --dry-run mode. No files will be modified.\n",
        ),
      );
    }

    // 1. Check if target is a theme: "theme <theme-id>"
    if (targets[0]?.toLowerCase() === "theme") {
      const themeId = targets[1]?.toLowerCase();
      if (!themeId) {
        console.log(
          pc.red(
            "  Error: Please specify a theme preset id (e.g. `npx soraui add theme sky`).",
          ),
        );
        console.log(
          pc.dim(
            `  Available themes: ${ALL_THEMES.map((t) => t.id).join(", ")}\n`,
          ),
        );
        process.exit(1);
      }

      const theme = ALL_THEMES.find((t) => t.id === themeId);
      if (!theme) {
        console.log(
          pc.red(`  Error: Theme preset "${themeId}" not found in registry.`),
        );
        console.log(
          pc.dim(
            `  Available themes: ${ALL_THEMES.map((t) => t.id).join(", ")}\n`,
          ),
        );
        process.exit(1);
      }

      console.log(
        pc.cyan(
          `\n  SoraUI — Installing theme preset: ${pc.bold(themeId)} (${theme.label})\n`,
        ),
      );
      const stylesDir = join(process.cwd(), "styles");
      const themePath = join(stylesDir, `sora-theme-${themeId}.css`);

      if (existsSync(themePath) && !options.overwrite) {
        console.log(
          pc.yellow(
            `  Warning: File styles/sora-theme-${themeId}.css already exists.`,
          ),
        );
        console.log(pc.dim("  Use --overwrite to replace existing files.\n"));
        return;
      }

      const cssContent = getThemeCSS(themeId);
      if (!isDryRun) {
        await mkdir(stylesDir, { recursive: true });
        await writeFile(themePath, cssContent, "utf8");
      }

      console.log(
        pc.green("  ✓") + ` Generated styles/sora-theme-${themeId}.css`,
      );
      console.log(
        pc.dim(
          `  Import this in your app: import './styles/sora-theme-${themeId}.css';\n`,
        ),
      );
      return;
    }

    // 2. Check if target is a block: "block <block-id>"
    if (targets[0]?.toLowerCase() === "block") {
      const blockId = targets[1]?.toLowerCase();
      if (!blockId) {
        console.log(
          pc.red(
            "  Error: Please specify a block id (e.g. `npx soraui add block login-form`).",
          ),
        );
        console.log(
          pc.dim(
            `  Available blocks: ${ALL_BLOCKS.map((b) => b.id).join(", ")}\n`,
          ),
        );
        process.exit(1);
      }

      const block = ALL_BLOCKS.find((b) => b.id === blockId);
      if (!block) {
        console.log(
          pc.red(`  Error: Block "${blockId}" not found in registry.`),
        );
        console.log(
          pc.dim(
            `  Available blocks: ${ALL_BLOCKS.map((b) => b.id).join(", ")}\n`,
          ),
        );
        process.exit(1);
      }

      console.log(
        pc.cyan(
          `\n  SoraUI — Adding block: ${pc.bold(block.name)} (${blockId})\n`,
        ),
      );

      // Resolve and install required component dependencies
      const requiredComponents = resolveDependencies(blockId, "block");
      console.log(
        pc.dim(`  Required components: ${requiredComponents.join(", ")}`),
      );

      const blocksDir = join(process.cwd(), "components/blocks");
      const blockPath = join(blocksDir, `${blockId}.tsx`);

      if (!isDryRun) {
        await mkdir(blocksDir, { recursive: true });
        await writeFile(blockPath, getBlockCode(blockId), "utf8");
      }
      console.log(
        pc.green("  ✓") + ` Generated components/blocks/${blockId}.tsx`,
      );

      // Add each required component primitive
      const outputDir = join(process.cwd(), config.componentsPath);
      for (const compName of requiredComponents) {
        const compPath = join(outputDir, `${compName}.tsx`);
        if (!existsSync(compPath) || options.overwrite) {
          if (!isDryRun) {
            await mkdir(outputDir, { recursive: true });
            await writeFile(compPath, getComponentCode(compName), "utf8");
          }
          console.log(
            pc.green("  ✓") +
              ` Generated ${config.componentsPath}/${compName}.tsx`,
          );
        }
      }

      console.log(pc.dim("\n  Block and dependencies successfully added!\n"));
      return;
    }

    // 3. Target is one or more components: "button", "input card dialog"
    console.log(
      pc.cyan(`\n  SoraUI — Adding component(s): ${targets.join(", ")}\n`),
    );
    const outputDir = join(process.cwd(), config.componentsPath);

    for (const compName of targets) {
      const name = compName.toLowerCase();
      const componentInfo = ALL_COMPONENTS.find((c) => c.name === name);

      if (!componentInfo) {
        console.log(
          pc.red(`  Error: Component "${name}" not found in registry.`),
        );
        console.log(
          pc.dim(
            "  Run `npx soraui list` to view all 44 available components.\n",
          ),
        );
        continue;
      }

      const targetFilePath = join(outputDir, `${name}.tsx`);

      if (existsSync(targetFilePath) && !options.overwrite) {
        console.log(
          pc.yellow(
            `  Warning: File ${config.componentsPath}/${name}.tsx already exists. Skipping.`,
          ),
        );
        continue;
      }

      const sourceCode = getComponentCode(name);

      if (!isDryRun) {
        await mkdir(outputDir, { recursive: true });
        await writeFile(targetFilePath, sourceCode, "utf8");
      }

      console.log(
        pc.green("  ✓") + ` Generated ${config.componentsPath}/${name}.tsx`,
      );
    }

    console.log(
      pc.dim(
        "\n  Done! Import your components directly into your application.\n",
      ),
    );
  });
