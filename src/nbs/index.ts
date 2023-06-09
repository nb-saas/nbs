import path from "path";
import fs from "fs-extra";

const nbsDir = path.join(process.cwd(), "src", ".nbs");

export const nbs = async () => {
  const mf = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "manifest.json"), "utf8")
  );

  fs.ensureDir(nbsDir);

  if (mf.type === "main-react-ts") {
    fs.cpSync(path.join(__dirname, "./main-app"), nbsDir, { recursive: true });
  } else {
    fs.cpSync(path.join(__dirname, "./micro-app"), nbsDir, { recursive: true });
  }
};
