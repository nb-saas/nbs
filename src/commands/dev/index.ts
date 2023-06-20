import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs-extra";
import path from "path";
import { nbs } from "../../nbs";
import { BFF } from "../../bff";
import portfinder from "portfinder";
import { consola } from "consola";

const startServer = async () => {
  const mf = fs.readJSONSync(path.join(process.cwd(), "manifest.json"));
  const pkg = fs.readJSONSync(path.join(process.cwd(), "package.json"));

  if (mf.type === "main-react-ts") {
    let name: string = mf.name;
    if (name.startsWith("lang.")) {
      name = mf._locales["zh"][name.replace("lang.", "")];
    }
    const _NBS = {
      app: {
        name: name,
        id: pkg.name,
        baseroute: "",
        url: `http://localhost:`,
      },
    };

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
                children: `window._NBS=${JSON.stringify(_NBS)}`,
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
  } else {
    const microPort = await portfinder.getPortPromise({ port: 5000 });
    consola.info("microPort:", microPort);

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
    server.printUrls();

    const mainPort = await portfinder.getPortPromise({ port: 9000 });
    consola.info("mainPort:", mainPort);

    await BFF(mainPort, microPort);
  }
};

export const dev = async () => {
  await nbs();
  await startServer();
};
