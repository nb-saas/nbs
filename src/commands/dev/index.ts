import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs-extra";
import path from "path";
import { nbs } from "../../nbs";
import { buildConf } from "../../nbsrc";
import { compileBFF } from "../../bff/compile";
import portfinder from "portfinder";
import { DEFAULT_CONFIG_FILE, type IConfig } from "../../nbsrc";
import { BFF } from "../../bff";

const startServer = async () => {
  const mainPort = await portfinder.getPortPromise({ port: 9000 });
  const microPort = await portfinder.getPortPromise({ port: 5000 });

  const config: IConfig = require(path.join(
    __dirname,
    DEFAULT_CONFIG_FILE
  )).default;
  console.log(".nbsrc");

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
    server: {
      port: microPort,
      proxy: {
        "/open-api": `http://localhost:${mainPort}`,
        "/nbs-api": `http://localhost:${mainPort}`,
      },
    },
  });
  await server.listen();
  await BFF(mainPort, microPort, config);
};

export const dev = async () => {
  await buildConf();
  await compileBFF();
  await nbs();
  await startServer();
};
