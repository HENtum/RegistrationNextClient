import axios from "axios";
import { getAccessToken, removeTokenStorage } from "../services/auth.helper";
import { AuthService } from "../services/auth.service";
import { errorCatch, getContentType } from "./api.helper";

export const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: getContentType(),
});
instance.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();
  if (config.headers && accessToken) config.headers.token = accessToken;
  return config;
});
instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") {
          removeTokenStorage();
        }
      }
    }
    throw error;
  }
);
