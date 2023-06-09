import { cac } from "cac";
import { pkg } from "./utils";
import { dev, createApp } from "./commands";

const cli = cac("nbs");

cli.command("", "start dev server").action(async (files, options) => {
  await dev();
});

cli.command("build", "build for production").action((files, options) => {
  console.log("xx", files, options);
});

cli
  .command("preview", "locally preview production build")
  .action((files, options) => {
    console.log(files, options);
  });

cli
  .command("create", "Scaffolding Your Micro App Project")
  .action((files, options) => {
    createApp();
  });

cli.help();
cli.version(pkg.version);
cli.parse();
