import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";
import path from "path";
import { nbs } from "../../nbs";
import express from "express";
import { request } from "undici";
import open from "open";
import { processHtmlPath } from "../../utils";
import { BFF } from "../../bff";

const startServer = async () => {
  const mf: any = fs.readFileSync(
    path.join(process.cwd(), "manifest.json"),
    "utf8"
  );

  if (mf.type === "main-react-ts") {
    const server = await createServer({
      configFile: false,
      plugins: [react(), createHtmlPlugin({ entry: "/src/.nbs/main.tsx" })],
      root: process.cwd(),
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), "src"),
          nbs: path.resolve(process.cwd(), "src/.nbs"),
        },
      },
      server: {},
    });
    await server.listen();

    server.printUrls();
  } else {
    const server = await createServer({
      configFile: false,
      plugins: [react(), createHtmlPlugin({ entry: "/src/.nbs/main.tsx" })],
      root: process.cwd(),
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), "src"),
          nbs: path.resolve(process.cwd(), "src/.nbs"),
        },
      },
      server: {},
    });
    await server.listen();

    await BFF();
  }
};

export const dev = async () => {
  await nbs();
  await startServer();
};
