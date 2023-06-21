import express from "express";
import { request } from "undici";
import { processHtmlPath, injectNBS } from "../utils";
import fs from "fs-extra";
import path from "path";
import { uid } from "uid";

export const staticProxy = (app: express.Application, microPort: number) => {
  app.use(async (req, res, next) => {
    // 1. 获取主应用资源

    const { body } = await request(
      "https://www.unpkg.com/nbs-main-app@0.0.5-beta.2/dist/index.html"
    );
    let html = await body.text();
    html = processHtmlPath(html);
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
};
