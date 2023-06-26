import * as esbuild from "esbuild";
import path from "path";

export const DEFAULT_CONFIG_FILE = ".nbsrc.js";

export interface IConfig {
  debuggerConfig: {
    target: string;
    username: string;
    password: string;
  };
}

export const defineConfig = (config: IConfig) => {
  return config;
};

export const buildConf = async () => {
  await esbuild.build({
    format: "cjs",
    platform: "browser",
    target: "esnext",
    loader: {
      ".ts": "ts",
      ".tsx": "tsx",
    },
    logLevel: "error",
    entryPoints: [path.join(process.cwd(), ".nbsrc.ts")],
    outfile: path.join(__dirname, DEFAULT_CONFIG_FILE),
  });
};
