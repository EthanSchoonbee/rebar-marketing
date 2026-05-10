import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://rebar.example",
  build: {
    sourcemap: false,
  },
  vite: {
    build: {
      cssMinify: true,
      minify: "esbuild",
    },
  },
});
