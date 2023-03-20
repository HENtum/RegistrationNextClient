import Cookies from "js-cookie";

export const saveTokenStroage = (data: {
  refreshToken: string;
  accessToken: string;
}) => {
  Cookies.set("refreshToken", data.refreshToken);
  Cookies.set("accessToken", data.accessToken);
};

export const removeTokenStorage = () => {
  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");
};
export const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken || null;
};
