import { cac } from "cac";
import { version } from "../package.json";
import { dev, build, preview, createApp } from "./commands";

export { defineConfig } from "./nbsrc";

const cli = cac("nbs");

cli.command("", "start dev server").action(async (files, options) => {
  await dev();
});

cli.command("build", "build for production").action(async (files, options) => {
  await build();
});

cli
  .command("preview", "locally preview production build")
  .action(async (files, options) => {
    await preview();
  });

cli
  .command("create", "Scaffolding Your Micro App Project")
  .action((files, options) => {
    createApp();
  });

cli.help();
cli.version(version);
cli.parse();
