import fs from "fs-extra";
import path from "path";
import { nbs } from "../../nbs";
import { mainDev } from "./main-app";
import { microDev } from "./micro-app";
import { buildConf } from "../../nbsrc";

const isMainApp = () => {
  const mf = fs.readJSONSync(path.join(process.cwd(), "manifest.json"));
  return mf?.type?.includes("main");
};

const startServer = async () => {
  if (isMainApp()) {
    await mainDev();
  } else {
    await microDev();
  }
};

export const dev = async () => {
  await buildConf();
  await nbs();
  await startServer();
};
