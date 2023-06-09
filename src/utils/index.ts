import fs from "fs";
import path from "path";

export const pkg = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8")
);

// export const mf = JSON.parse(
//   fs.readFileSync(path.join(process.cwd(), "manifest.json"), "utf8")
// );

export const mf = { type: "micro-app" };
