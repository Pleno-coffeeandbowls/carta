import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Required for the project URL: https://pleno-coffeeandbowls.github.io/carta/
  base: "/carta/",
  root: "client",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  preview: {
    allowedHosts: true,
  },
  plugins: [react(), tailwindcss()],
});
