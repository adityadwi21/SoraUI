import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

export interface SoraConfig {
  $schema?: string;
  theme: string;
  componentsPath: string;
  hooksPath: string;
  typescript: boolean;
  stylesPath: string;
  version: string;
}

export const DEFAULT_CONFIG: SoraConfig = {
  $schema: "https://soraui.dev/schema.json",
  theme: "sky",
  componentsPath: "components/ui",
  hooksPath: "hooks",
  typescript: true,
  stylesPath: "styles/globals.css",
  version: "0.1.0",
};

export async function getConfig(
  cwd: string = process.cwd(),
): Promise<SoraConfig> {
  const configPath = join(cwd, "soraui.config.json");
  if (!existsSync(configPath)) {
    return DEFAULT_CONFIG;
  }
  try {
    const content = await readFile(configPath, "utf8");
    return { ...DEFAULT_CONFIG, ...JSON.parse(content) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export async function writeConfig(
  config: SoraConfig,
  cwd: string = process.cwd(),
): Promise<void> {
  const configPath = join(cwd, "soraui.config.json");
  await writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
}
