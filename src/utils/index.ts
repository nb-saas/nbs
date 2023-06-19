import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

export const mf = () => {
  return fs.readFileSync(path.join(process.cwd(), "manifest.json"), "utf8");
};

export const processHtmlPath = (html: string) => {
  const $ = cheerio.load(html);
  const tags = ["img src", "link href", "script src"];
  const isUrlReg = /^(data:|https?:|\/)/i;
  tags.forEach((p) => {
    const [tagName, attr] = p.split(" ");
    $(tagName).map(function () {
      const origin = $(this).attr(attr) || "";
      if (isUrlReg.test(origin)) return;
      if (!origin) {
        return;
      }
      const newUrl = new URL(
        origin,
        `https://www.unpkg.com/nbs-main-app@0.0.4/dist/`
      ).href;
      $(this).attr(attr, newUrl);
    });
  });

  return $.html();
};
