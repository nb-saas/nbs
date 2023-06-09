import { build as toBuild } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import { nbs } from "../../nbs";

const startBuild = async () => {
  async () => {
    await toBuild({
      root: process.cwd(),
      plugins: [
        react(),
        createHtmlPlugin({ entry: "node_modules/.nbs/main.ts" }),
      ],
      configFile: false,
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
          nbs: path.resolve(__dirname, "src/.nbs"),
        },
      },
    });
  };
};

export const build = async () => {
  await nbs();
  await startBuild();
};
