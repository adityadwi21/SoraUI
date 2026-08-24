/**
 * SoraUI CLI — Entry Point
 *
 * Usage:
 *   npx soraui init
 *   npx soraui add button
 *   npx soraui list
 *   npx soraui search table
 */
import { Command } from "commander";
import { initCommand } from "./commands/init";
import { addCommand } from "./commands/add";
import { listCommand } from "./commands/list";
import { searchCommand } from "./commands/search";

const program = new Command();

program
  .name("soraui")
  .description("SoraUI CLI — Add accessible UI components to your project")
  .version("0.1.0");

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(searchCommand);

program.parse(process.argv);
