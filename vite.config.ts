import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild",
    rollupOptions: {
      treeshake: "recommended",
      plugins: [visualizer(), terser()],
    },
  },
});
