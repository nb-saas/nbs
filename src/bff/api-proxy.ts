import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const apiProxy = (app: express.Application) => {
  const target = "http://localhost:8080";
  app.use("/open-api", createProxyMiddleware({ target, changeOrigin: true }));
};
