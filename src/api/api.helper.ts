import Cookies from "js-cookie";

export const getContentType = () => ({
  "Content-type": " application/json",
  token: Cookies.get("accessToken"),
});

export const errorCatch = (error: any) => {
  const message = error?.response?.data?.message;
  return message
    ? typeof error.response.data.message === "object"
      ? message[0]
      : message
    : error.message;
};
