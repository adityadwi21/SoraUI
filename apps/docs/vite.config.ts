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
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — loaded on every page, cached permanently
          "vendor-react": ["react", "react-dom"],
          // Lucide icon pack — large but rarely changes
          "vendor-icons": ["lucide-react"],
          // Registry data — large static data, separate from UI logic
          "registry-components": [
            "./src/registry/components.tsx",
          ],
          "registry-blocks": [
            "./src/registry/blocks.tsx",
          ],
          "registry-templates": [
            "./src/registry/templates.tsx",
          ],
        },
      },
    },
  },
});
