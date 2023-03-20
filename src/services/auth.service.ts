import axios from "axios";
import Cookies from "js-cookie";
import { getContentType } from "../api/api.helper";
import { saveTokenStroage } from "./auth.helper";

export const AuthService = {
  async getNewTokens() {
    const refreshToken = Cookies.get("refreshToken");
    const response = await axios.post(
      "http://localhost:4000/user/refresh",
      { refreshToken },
      { headers: getContentType() }
    );

    if (response.data.accessToken) {
      const token = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
      saveTokenStroage(token);
    }
  },
};
