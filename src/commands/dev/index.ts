import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";
import path from "path";
import { nbs } from "../../nbs";
import express from "express";
import { request } from "undici";
import open from "open";
import { processHtmlPath, mf } from "../../utils";

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
    const app = express();

    app.use(async (req, res, next) => {
      const url = req.url;
      if (url.startsWith("/open-api")) {
        //TODO 接口代理转发
      } else {
        const { body } = await request(
          "https://www.unpkg.com/nbs-main-app@0.0.2/dist/index.html"
        );
        const html = await body.text();
        res.send(processHtmlPath(html));
      }
    });
    app.listen(8000, () => {
      console.log(`Example app listening on port ${8000}`);
      open(`http://localhost:8000`);
    });
  }
};

export const dev = async () => {
  await nbs();
  await startServer();
};
