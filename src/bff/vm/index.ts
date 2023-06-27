import { NodeVM } from "vm2";
import { Request, Response } from "express";
import { AxiosInstance } from "axios";
import { request } from "../api";
import { getToken } from "../api/sign";

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
  let mm = vm.run(
    `module.exports = function(context,cb) { context.axios.get('/v1.0/iot-02/users').then(res=>{cb(res.data)}) }`
  );
  mm(context, (data: any) => {
    console.log("mm", data);
    console.log("耗时", new Date().getTime() - start);
    res.json(data);
  });
};
