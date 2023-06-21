import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import portfinder from "portfinder";
import path from "path";
import { consola } from "consola";
import { BFF } from "../../bff";

export const microDev = async () => {
  const microPort = await portfinder.getPortPromise({ port: 5000 });

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
    },
  });
  await server.listen();

  const mainPort = await portfinder.getPortPromise({ port: 9000 });

  consola.info("mainPort:", mainPort);
  consola.info("microPort:", microPort);

  await BFF(mainPort, microPort);
};
