import express from "express";
import open from "open";
import { consola } from "consola";
import { apiMock } from "./api-mock";
import { apiProxy } from "./api-proxy";
import { staticProxy } from "./static-proxy";

export const BFF = async (mainPort: number, microPort: number) => {
  const app = express();

  apiMock(app);
  apiProxy(app);
  staticProxy(app, microPort);

  app.listen(mainPort, () => {
    consola.info(`http://localhost:${mainPort}`);
    open(`http://localhost:${mainPort}`);
  });
};
