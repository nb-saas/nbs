import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";

export const mainDev = async () => {
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
    server: {},
  });
  await server.listen();

  server.printUrls();
};
