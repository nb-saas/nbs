import { mf } from "../utils";
import path from "path";
import fs from "fs-extra";

const nbsDir = path.join(process.cwd(), "node_modules", ".nbs");

export const nbs = async () => {
  fs.ensureDir(nbsDir);
  if (mf.type === "main-app") {
    fs.cpSync(path.join(__dirname, "./main-app"), nbsDir, { recursive: true });
  } else {
    fs.cpSync(path.join(__dirname, "./micro-app"), nbsDir, { recursive: true });
  }
};
