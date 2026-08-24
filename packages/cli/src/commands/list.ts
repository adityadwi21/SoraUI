import { Command } from "commander";
import pc from "picocolors";
import { ALL_COMPONENTS } from "../utils/registry";

export const listCommand = new Command("list")
  .description("List all components available in the SoraUI registry")
  .option("-l, --level <level>", "Filter by level (1 or 2)")
  .action((options) => {
    console.log(pc.cyan("\n  SoraUI Registry — Available Components\n"));

    let items = ALL_COMPONENTS;
    if (options.level) {
      const targetLevel = Number(options.level);
      items = items.filter((c) => c.level === targetLevel);
    }

    console.log(pc.bold("  Level 1 — Zero/Minimal Runtime:"));
    items
      .filter((c) => c.level === 1)
      .forEach((c) => {
        console.log(
          `    ${pc.green("•")} ${pc.bold(c.name.padEnd(14))} ${pc.dim(c.description)}`,
        );
      });

    console.log("");
    console.log(
      pc.bold("  Level 2 — Interactive (Keyboard Accessible & ARIA):"),
    );
    items
      .filter((c) => c.level === 2)
      .forEach((c) => {
        console.log(
          `    ${pc.cyan("•")} ${pc.bold(c.name.padEnd(14))} ${pc.dim(c.description)}`,
        );
      });

    console.log(pc.dim(`\n  Total: ${items.length} component(s)`));
    console.log(pc.dim("  Install with: npx soraui add <name>\n"));
  });
