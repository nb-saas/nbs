const fs = require("fs-extra");
const path = require("path");

fs.copySync(
  path.join(process.cwd(), "./src/nbs/main-app"),
  path.join(process.cwd(), "dist/main-app")
);

fs.copySync(
  path.join(process.cwd(), "./src/nbs/micro-app"),
  path.join(process.cwd(), "dist/micro-app")
);

fs.copySync(
  path.join(process.cwd(), "./src/commands/create/template-main-react-ts"),
  path.join(process.cwd(), "dist/template-main-react-ts")
);

fs.copySync(
  path.join(process.cwd(), "./src/commands/create/template-micro-react-ts"),
  path.join(process.cwd(), "dist/template-micro-react-ts")
);
