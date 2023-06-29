import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import { DEFAULT_CONFIG_FILE, type IConfig } from "../../nbsrc";

export const mainDev = async () => {
  const config: IConfig = require(path.join(
    __dirname,
    DEFAULT_CONFIG_FILE
  )).default;
  console.log(".nbsrc");

  const server = await createServer({
    configFile: false,
    plugins: [
      react(),
      createHtmlPlugin({
        entry: "/src/.nbs/main.tsx",
        inject: {
          tags: [
            {
              injectTo: "head",
              tag: "script",
              children: `window._NBS=${JSON.stringify({})}`,
            },
          ],
        },
      }),
    ],
    root: process.cwd(),
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src"),
        nbs: path.resolve(process.cwd(), "src/.nbs"),
      },
    },
    server: {
      proxy: {
        "/open-api": {
          target: config.debuggerConfig.target,
          changeOrigin: true,
        },
        "/nbs-api": {
          target: config.debuggerConfig.target,
          changeOrigin: true,
        },
      },
    },
  });
  await server.listen();

  server.printUrls();
};
