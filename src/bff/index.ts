import express from "express";
import { request } from "undici";
import open from "open";
import { processHtmlPath } from "../utils";
import { createProxyMiddleware } from "http-proxy-middleware";

const isMock = false;

export const BFF = async (appUrl: string) => {
  const app = express();

  // mock
  isMock &&
    app.use(async (req, res, next) => {
      if (req.url.startsWith("/open-api")) {
        res.json({
          code: 200,
          data: {},
        });
      } else {
        next();
      }
    });

  // /open-api 代理
  const target = "http://localhost:8080";
  app.use("/open-api", createProxyMiddleware({ target, changeOrigin: true }));

  // 主应用资源代理、saas信息注入及其登录

  app.use(async (req, res, next) => {
    // 1. 获取主应用资源
    const { body } = await request(
      "https://www.unpkg.com/nbs-main-app@0.0.4/dist/index.html"
    );
    let html = await body.text();
    html = processHtmlPath(html);
    console.log("html", html);
    // 2. 获取SaaS信息并注入html
    // 3. 做登录操作
    res.send(html);
  });
  app.listen(8000, () => {
    console.log(`Example app listening on port ${8000}`);
    open(`http://localhost:8000`);
  });
};
