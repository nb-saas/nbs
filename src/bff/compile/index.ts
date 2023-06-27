import * as esbuild from "esbuild";
import fs from "fs";

export const compileBFF = async () => {
  const files = fs
    .readdirSync(`${process.cwd()}/bff`)
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
};
