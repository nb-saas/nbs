import { createBrowserRouter } from "react-router-dom";

const routeFiles = (import.meta as any).glob("../pages/**/index.tsx", {
  eager: true,
});
console.log("routeFiles", routeFiles);

const router = createBrowserRouter(
  Object.keys(routeFiles)
    .filter(
      (key) =>
        (key = !key.includes("components") && !key.includes("components"))
    )
    .map((key) => {
      const paths = key.split("/");
      const path = paths.slice(2, -1).reduce((acc, path) => {
        return acc + `/${path}`;
      }, "");
      const Page = (routeFiles[key] as any).default;
      console.log("path", path);
      return {
        path: path === "/home" ? "/" : `${path}`,
        element: <Page />,
      };
    })
);

export default router;
