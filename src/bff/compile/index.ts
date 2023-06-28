import * as esbuild from "esbuild";
import fs from "fs";

export const compileBFF = async () => {
  const files = fs
    .readdirSync(`${process.cwd()}/bff`)
    .filter((file) => file !== "types.ts")
    .map((file) => `${process.cwd()}/bff/${file}`);
  console.log(files);
  await esbuild.build({
    format: "cjs",
    platform: "node",
    target: "esnext",
    loader: {
      ".ts": "ts",
    },
    logLevel: "error",
    entryPoints: files,
    outdir: `${process.cwd()}/node_modules/.bff`,
  });
  await scanBFF();
};

export const bffApis: Record<string, any> = {};

const scanBFF = async () => {
  const files = fs.readdirSync(`${process.cwd()}/node_modules/.bff`);
  console.log("files", files);

  files.forEach((file) => {
    const api = require(`${process.cwd()}/node_modules/.bff/${file}`).default;
    bffApis[`${api.method.toUpperCase()}:${api.path}`] = api;
  });
  console.log("scanBFF", bffApis);
};
