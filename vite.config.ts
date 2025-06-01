import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "react-analytics",
      fileName: (format) => `react-analytics.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
        exports: "named",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
    sourcemap: true,
    minify: "esbuild",
    target: "es2015",
  },
  server: {
    open: "/example/index.html",
  },
});
