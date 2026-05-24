import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tsconfigPaths(),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:5000",
        changeOrigin: true,
        router: () => {
          try {
            const port = fs.readFileSync("../.backend-port", "utf-8").trim();
            return `http://localhost:${port}`;
          } catch (e) {
            return process.env.VITE_API_URL || "http://localhost:5000";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
