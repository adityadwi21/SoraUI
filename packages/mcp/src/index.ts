export { createMcpServer, runServer } from "./server";
export * from "./registry/types";
export * from "./registry/adapter";
export * from "./registry/resolver";
export * from "./validation/index";

export { handleGetContext } from "./tools/get-context";
export { handleSearch } from "./tools/search";
export { handleList } from "./tools/list";
export { handleInspectComponent } from "./tools/inspect-component";
export { handleInspectBlock } from "./tools/inspect-block";
export { handleInspectTemplate } from "./tools/inspect-template";
export { handleInspectTheme } from "./tools/inspect-theme";
export { handleComposeRecipe } from "./tools/compose-recipe";
export { handleGetInstallCommands } from "./tools/install-commands";
export { handleResolveDependencies } from "./tools/resolve-dependencies";
export { handleValidateComposition } from "./tools/validate-composition";
