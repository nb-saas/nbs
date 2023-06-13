import axios from "axios";

const request = axios.create({
  baseURL: "/open-api",
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => Promise.reject(err)
);

export default { request };
