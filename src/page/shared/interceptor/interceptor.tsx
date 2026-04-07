import axios from "axios";
import { getLocalStorageObjDetails } from "../helper/helper";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(getLocalStorageObjDetails("userData")).token;
    console.log("token", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    try {
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error?.response?.status === 401 || error?.response?.status == 419) {
      return Promise.reject(error);
    }
  },
);
