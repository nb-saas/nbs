import { FC } from "react";
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from "@micro-zoe/micro-app/polyfill/jsx-custom-event";
import { useTranslation } from "react-i18next";
import { Switch, Route, useHistory } from "react-router-dom";
import {} from "react-router-dom";
import { i18n, API } from "nbs";

const Home: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const apps = [
    {
      name: "app1",
      baseroute: "/my-page",
      url: "http://localhost:5174",
      iframe: true,
      "keep-router-state": true,
      data: {
        region: "tx",
        user: () => {
          return { name: "ruomu", uid: "123" };
        },
        mainHistory: history,
        API,
        t,
        i18n,
      },
      onCreated: () => {
        console.log("micro-app元素被创建");
      },
      onBeforemount: () => {
        console.log("即将被渲染");
      },
      onMounted: () => {
        console.log("已经渲染完成");
      },
      onUnmount: () => {
        console.log("已经卸载");
      },
      onError: () => {
        console.log("渲染出错");
      },
    },
  ];

  return (
    <div className="App">
      <h1>{t("home")}</h1>
      <Switch>
        {apps.map((app) => {
          return (
            <Route path={app.baseroute} key={app.baseroute}>
              <micro-app {...app} />
            </Route>
          );
        })}
      </Switch>
    </div>
  );
};

export default Home;
