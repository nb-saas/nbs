import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { type IConfig } from "../nbsrc";
import { NodeVM } from "vm2";
import axios from "axios";
import { reqSign, getToken } from "./sign";

const request = axios.create({});

request.interceptors.request.use(
  async (config) => {
    const { url, headers } = await reqSign({
      path: config.url || "",
      method: config.method || "GET",
      body: config.data,
      query: {},
    });
    console.log("headers", headers, url);

    config.headers = { ...config.headers, ...headers } as any;
    config.url = url;

    return config;
  },
  (err) => Promise.reject(err)
);

const vm = new NodeVM({
  console: "inherit",
  sandbox: {},
  require: {
    external: true,
    builtin: ["fs", "path"],
    root: "./",
  },
  allowAsync: true,
});
// vm.run()

export const apiProxy = (app: express.Application, config: IConfig) => {
  const target = config.debuggerConfig.target;
  // app.use("/open-api", createProxyMiddleware({ target, changeOrigin: true }));
  app.use("/open-api", async (req, res, next) => {
    console.log("open-api", req.url);
    await getToken();
    const result = await request.get(`/v1.0/iot-02/users`);
    console.log("result", result.data);
    res.json({
      success: true,
    });
  });
};
