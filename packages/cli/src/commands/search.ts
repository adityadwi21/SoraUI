import { Command } from "commander";
import pc from "picocolors";
import { ALL_COMPONENTS } from "../utils/registry";

export const searchCommand = new Command("search")
  .description("Search components by keyword, name, or tag")
  .argument("<query>", "Search term")
  .action((query: string) => {
    const q = query.toLowerCase();
    console.log(pc.cyan(`\n  SoraUI Search: "${pc.bold(query)}"\n`));

    const results = ALL_COMPONENTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.tags && c.tags.some((t) => t.toLowerCase().includes(q))),
    );

    if (results.length === 0) {
      console.log(pc.dim("  No components matching query.\n"));
      return;
    }

    results.forEach((c) => {
      const levelBadge =
        c.level === 1 ? pc.green("[Level 1]") : pc.cyan("[Level 2]");
      console.log(
        `  ${levelBadge} ${pc.bold(c.name.padEnd(14))} ${pc.dim(c.description)}`,
      );
    });

    console.log(pc.dim(`\n  Found ${results.length} result(s)\n`));
  });
