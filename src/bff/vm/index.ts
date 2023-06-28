import { NodeVM } from "vm2";
import { Request, Response, Router } from "express";
import { AxiosInstance } from "axios";
import { request } from "../api";
import { getToken } from "../api/sign";
import { bffApis } from "../compile";

export interface IContext {
  req: Request;
  axios: AxiosInstance;
}

export interface ICb<T> {
  (data: T): void;
}

const vm = new NodeVM({
  console: "inherit",
  sandbox: {},
  require: {
    external: true,
    builtin: ["fs", "path"],
    root: "./",
  },
  allowAsync: true,
});

// micro-app-code + version + api
export const vmRun = async (req: Request, res: Response) => {
  await getToken();
  const context: IContext = { req, axios: request };
  const start = new Date().getTime();

  console.log("method", req.method);
  console.log("path", req.path);

  bffApis["GET:/user/:id"].handler(context, (data: any) => {
    console.log("mm", data);
    console.log("耗时", new Date().getTime() - start);
    res.json(data);
  });

  // let mm = vm.run(
  //   `module.exports = function(context,cb) { context.axios.get('/v1.0/iot-02/users').then(res=>{cb(res.data)}) }`
  // );
  // mm(context, (data: any) => {
  //   console.log("mm", data);
  //   console.log("耗时", new Date().getTime() - start);
  //   res.json(data);
  // });
};

export const vmRouter = () => {
  const router: any = Router();

  Object.keys(bffApis).forEach((key) => {
    const method = bffApis[key].method.toLowerCase();
    const path = bffApis[key].path.toLowerCase();
    router[method](path, async (req: Request, res: Response) => {
      await getToken();
      const context: IContext = { req, axios: request };
      const start = new Date().getTime();

      console.log("method", req.method);
      console.log("path", req.path);

      bffApis[key].handler(context, (data: any) => {
        console.log("mm", data);
        console.log("耗时", new Date().getTime() - start);
        res.json(data);
      });
    });
  });

  return router;
};
