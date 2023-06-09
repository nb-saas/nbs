import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import { nbs } from "../../nbs";

const startServer = async () => {
  const server = await createServer({
    configFile: false,
    plugins: [
      react(),
      createHtmlPlugin({ entry: "node_modules/.nbs/main.ts" }),
    ],
    root: process.cwd(),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        nbs: path.resolve(__dirname, "src/.nbs"),
      },
    },
    server: {},
  });
  await server.listen();

  server.printUrls();
};

export const dev = async () => {
  await nbs();
  await startServer();
};
