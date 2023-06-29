import express, { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { type IConfig } from "../nbsrc";
import { vmRun, vmRouter } from "./vm";
import fs from "fs";

export const apiProxy = (app: express.Application, config: IConfig) => {
  const target = config.debuggerConfig.target;
  console.log("xxxx", target);
  // app.use("/open-api", createProxyMiddleware({ target, changeOrigin: true }));

  // app.use("/open-api", async (req, res, next) => {
  //   vmRun(req, res);
  // });

  if (fs.existsSync(`${process.cwd()}/bff`)) {
    app.use("/open-api", vmRouter());
  } else {
    // app.use("/open-api", createProxyMiddleware({ target, changeOrigin: true }));
    app.use("/open-api", (req, res, next) => {
      console.log("xxxx", req.url);
    });
  }
};
