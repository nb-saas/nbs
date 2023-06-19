import { useState, useEffect } from "react";
import Home from "../../pages/home";

export const useRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const routeFiles = (import.meta as any).glob("../../pages/**/index.tsx", {
      eager: true,
    });
    console.log("routeFiles", routeFiles);

    const routeKeys = Object.keys(routeFiles).filter(
      (key) => !key.includes("components") && !key.includes("home")
    );
    setRoutes([
      ...routeKeys.map((key) => {
        const paths = key.split("/");
        const path = paths.slice(3, -1).reduce((acc, path) => {
          return acc + `/${path}`;
        }, "");
        const Page = (routeFiles[key] as any).default;
        console.log("path", path);
        return { path, component: Page, exact: true };
      }),
      {
        path: "/",
        component: Home,
        exact: false,
      },
    ] as any);
  }, []);

  return routes;
};

export const useTheme = () => {
  const [themeConf, setThemeConf] = useState<ThemeConfig>({});

  useEffect(() => {
    setThemeConf({
      token: { colorPrimary: "#00b96b" },
    });
  }, []);
  return themeConf;
};
