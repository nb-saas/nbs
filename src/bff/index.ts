import express from "express";
import { request } from "undici";
import open from "open";
import fs from "fs-extra";
import path from "path";
import { processHtmlPath, injectNBS } from "../utils";
import { createProxyMiddleware } from "http-proxy-middleware";
import { uid } from "uid";

const isMock = false;

export const BFF = async (mainPort: number, microPort: number) => {
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
      "https://www.unpkg.com/nbs-main-app@0.0.5-beta.2/dist/index.html"
    );
    let html = await body.text();
    html = processHtmlPath(html);
    console.log("html", html);
    // 2. 获取SaaS信息并注入html
    const mf = fs.readJSONSync(path.join(process.cwd(), "manifest.json"));
    const pkg = fs.readJSONSync(path.join(process.cwd(), "package.json"));

    let name: string = mf.name;
    if (name.startsWith("lang.")) {
      name = mf._locales["zh"][name.replace("lang.", "")];
    }
    const _NBS = {
      app: {
        name: name,
        id: pkg.name,
        baseroute: `/apps/${uid()}`,
        url: `http://localhost:${microPort}`,
      },
    };
    html = injectNBS(html, _NBS);

    // 3. 做登录操作
    res.send(html);
  });
  app.listen(mainPort, () => {
    console.log(`Example app listening on port ${mainPort}`);
    open(`http://localhost:${mainPort}`);
  });
};
