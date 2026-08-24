import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@soraui/react/styles": path.resolve(
        __dirname,
        "../../packages/react/src/styles.css",
      ),
      "@soraui/react": path.resolve(
        __dirname,
        "../../packages/react/src/index.ts",
      ),
      "@soraui/core/theme": path.resolve(
        __dirname,
        "../../packages/core/src/theme",
      ),
      "@soraui/core": path.resolve(
        __dirname,
        "../../packages/core/src/index.ts",
      ),
      "@soraui/hooks": path.resolve(
        __dirname,
        "../../packages/hooks/src/index.ts",
      ),
    },
  },
  server: {
    port: 3001,
  },
});
