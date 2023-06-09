import { FC } from "react";
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from "@micro-zoe/micro-app/polyfill/jsx-custom-event";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { i18n } from "nbs";

const Home: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="App">
      <h1>{t("home")}</h1>
      <micro-app
        name="app1"
        baseroute="/my-page/"
        url="http://localhost:5174/"
        iframe
        keep-router-state={true}
        data={{
          region: "tx",
          user: () => {
            return { name: "ruomu", uid: "123" };
          },
          navigate,
          t,
          i18n,
        }} //主应用提供的属性，方法
        default-page="/"
        onCreated={() => console.log("micro-app元素被创建")}
        onBeforemount={() => console.log("即将被渲染")}
        onMounted={() => console.log("已经渲染完成")}
        onUnmount={() => console.log("已经卸载")}
        onError={() => console.log("渲染出错")}
      ></micro-app>
    </div>
  );
};

export default Home;
