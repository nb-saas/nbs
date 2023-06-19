import { toPrompts } from "./prompts";
import fs from "fs-extra";
import path, { join } from "path";

export const createApp = async () => {
  console.log("初始化项目");

  const response = await toPrompts();
  console.log("\n");
  console.log(
    `Scaffolding project in ${path.join(process.cwd(), response.name)}...`
  );
  console.log("\n");

  const dest = path.join(process.cwd(), response.name);
  fs.ensureDirSync(dest);

  if (response.appType == "main-app") {
    fs.cpSync(path.join(__dirname, "./template-main-react-ts"), dest, {
      recursive: true,
      dereference: true,
    });
  } else {
    fs.cpSync(path.join(__dirname, "./template-micro-react-ts"), dest, {
      recursive: true,
      dereference: true,
    });
  }
  fs.writeJSONSync(
    path.join(process.cwd(), response.name, "package.json"),
    {
      ...fs.readJSONSync(
        path.join(process.cwd(), response.name, "package.json")
      ),
      name: response.name,
    },
    { spaces: 2 }
  );

  console.log(`Done. Now run:\n`);
  console.log(`  cd ${response.name}`);
  console.log(`  pnpm install`);
  console.log(`  pnpm run dev`);
};
