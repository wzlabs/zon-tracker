import axios from "axios";
import config from "@/config/config";
// import type { App } from "vue";

// interface AxiosOptions {
//   baseUrl?: string;
//   token?: string;
// }

// export default {
//   install: (app: App, options: AxiosOptions) => {
//     app.config.globalProperties.$axios = axios.create({
//       baseURL: options.baseUrl,
//       headers: {
//         Authorization: options.token ? `Bearer ${options.token}` : "",
//         "content-type": "application/json",
//         Accept: "application/json",
//       },
//     });
//   },
// };

type AUTH_TYPE = "Bearer" | "JWT";

// Global
axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=UTF-8";

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: config.apiUrl,
});

// Alter defaults after instance has been created
axiosInstance.defaults.headers.common["Content-Type"] =
  "application/json; charset=UTF-8";

export const setBaseUrl = (baseUrl: string) => {
  axios.defaults.baseURL = baseUrl;
  axiosInstance.defaults.baseURL = baseUrl;
};

export const setContentType = (
  contentType = "application/json; charset=UTF-8"
) => {
  axios.defaults.headers.common["Content-Type"] = contentType;
  axiosInstance.defaults.headers.common["Content-Type"] = contentType;
};

export const setAuthorization = (
  authToken: string,
  authType: AUTH_TYPE = "Bearer"
) => {
  console.log("setAuthorization..........", authType);
  axios.defaults.headers.common["Authorization"] = authToken
    ? authType + " " + authToken
    : "";

  axiosInstance.defaults.headers.common["Authorization"] = authToken
    ? authType + " " + authToken
    : "";
};

// export default {
//   setBaseUrl,
//   setAuthorization,
//   axiosInstance,
// };
