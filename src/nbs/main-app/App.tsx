import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useRoutes, useTheme } from "./hooks";
import { ConfigProvider } from "antd";

const App = () => {
  const routes = useRoutes();
  const theme = useTheme();
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          {routes.map((route) => {
            const { exact, path, component } = route;
            if (exact) {
              return (
                <Route key={path} exact path={path} component={component} />
              );
            } else {
              return <Route key={path} path={path} component={component} />;
            }
          })}
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
