import { build as toBuild } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import { nbs } from "../../nbs";

const startBuild = async () => {
  await toBuild({
    root: process.cwd(),
    plugins: [react(), createHtmlPlugin({ entry: "/src/.nbs/main.tsx" })],
    configFile: false,
    base: "./",
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src"),
        nbs: path.resolve(process.cwd(), "src/.nbs"),
      },
    },
  });
};

export const build = async () => {
  await nbs();
  await startBuild();
};
