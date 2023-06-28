import express, { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { type IConfig } from "../nbsrc";
import { vmRun, vmRouter } from "./vm";

export const apiProxy = (app: express.Application, config: IConfig) => {
  const target = config.debuggerConfig.target;
  // app.use("/open-api", createProxyMiddleware({ target, changeOrigin: true }));

  // app.use("/open-api", async (req, res, next) => {
  //   vmRun(req, res);
  // });

  app.use("/open-api", vmRouter());
};
