import axios from "axios";
import { reqSign, getToken } from "./sign";

export const request = axios.create({});

request.interceptors.request.use(
  async (config) => {
    const { url, headers } = await reqSign({
      path: config.url || "",
      method: config.method || "GET",
      body: config.data,
      query: {},
    });
    console.log("headers", headers, url);

    config.headers = { ...config.headers, ...headers } as any;
    config.url = url;

    return config;
  },
  (err) => Promise.reject(err)
);
