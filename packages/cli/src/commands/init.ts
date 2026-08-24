import { Command } from "commander";
import pc from "picocolors";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { writeConfig, DEFAULT_CONFIG } from "../utils/config";

export const initCommand = new Command("init")
  .description("Initialize SoraUI in your project")
  .option("-t, --theme <theme>", "Default theme preset to use", "sky")
  .option("-p, --path <path>", "Components output directory", "components/ui")
  .option("-y, --yes", "Skip prompts and use defaults", false)
  .action(async (options) => {
    console.log(pc.cyan("\n  SoraUI — Initializing project setup\n"));

    const config = {
      ...DEFAULT_CONFIG,
      theme: options.theme || "sky",
      componentsPath: options.path || "components/ui",
    };

    try {
      // 1. Write configuration
      await writeConfig(config);
      console.log(
        pc.green("  ✓") +
          ` Created soraui.config.json (theme: ${pc.bold(config.theme)})`,
      );

      // 2. Create components folder
      const targetDir = join(process.cwd(), config.componentsPath);
      await mkdir(targetDir, { recursive: true });
      console.log(
        pc.green("  ✓") + ` Created ${config.componentsPath}/ directory`,
      );

      // 3. Create theme tokens css file
      const stylesDir = join(process.cwd(), "styles");
      await mkdir(stylesDir, { recursive: true });
      const themeCssPath = join(stylesDir, "sora-theme.css");

      const themeCssContent = `/* SoraUI Theme Tokens — ${config.theme} */
@import '@soraui/core/theme/presets/${config.theme}.css';
@import '@soraui/react/styles';
`;
      await writeFile(themeCssPath, themeCssContent, "utf8");
      console.log(pc.green("  ✓") + " Created styles/sora-theme.css");

      console.log(pc.dim("\n  Next steps:"));
      console.log(pc.dim("  npx soraui add button"));
      console.log(pc.dim("  npx soraui add dialog"));
      console.log(pc.dim("  npx soraui list\n"));
    } catch (error) {
      console.error(pc.red("  Error during initialization:"), error);
      process.exit(1);
    }
  });
