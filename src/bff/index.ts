import express from "express";
import { request } from "undici";
import open from "open";
import { processHtmlPath } from "../utils";

export const BFF = async () => {
  const app = express();

  app.use(async (req, res, next) => {
    const url = req.url;
    if (url.startsWith("/open-api")) {
      //TODO 接口代理转发
    }
    if (url === "/saas-info") {
      // TODO 开发态构造 SaaS 信息
    } else {
      const { body } = await request(
        "https://www.unpkg.com/nbs-main-app@0.0.2/dist/index.html"
      );
      const html = await body.text();
      res.send(processHtmlPath(html));
    }
  });
  app.listen(8000, () => {
    console.log(`Example app listening on port ${8000}`);
    open(`http://localhost:8000`);
  });
};
