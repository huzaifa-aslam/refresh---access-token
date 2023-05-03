import axios from "axios";
import { url } from "./baseUrl";
import { getRefreshToken } from "./auth";

const api = axios.create({
  baseURL: url,
  withCredentials: true, // send cookies with requests
  // validateStatus: () => {
  //   return true;
  // },
  // validateStatus: function (status) {
  //   return (status >= 200 && status < 300) || status === 401 || status === 403;
  // },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    let accessToken = localStorage.getItem("accessToken");

    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.Accept = "application/json";
    // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    throw error;
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    debugger;
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      let refreshToken = localStorage.getItem("refreshToken");
      const access_token = await getRefreshToken({
        refreshToken,
      });
      localStorage.setItem("accessToken", access_token);
      // axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
