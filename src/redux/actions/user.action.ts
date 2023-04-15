import { getContentType } from "@/src/api/api.helper";
import instance from "@/src/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  UserCreateParams,
  UserEditParams,
  UserLoginTap2Params,
} from "../slices/userSlice/userTypes";
import { AuthService } from "@/src/services/auth.service";

export const fetchCreateUser = createAsyncThunk(
  "user/create",
  async (params: UserCreateParams) => {
    const { data } = await instance({
      url: "/user/create",
      method: "POST",
      data: params,
      headers: getContentType(),
    });
    return data;
  }
);

export const fetchLoginUser = createAsyncThunk(
  "user/login",
  async (params: { email: string }) => {
    const { data } = await instance({
      url: "/user/login",
      method: "POST",
      data: params,
      headers: getContentType(),
    });
    return data;
  }
);
export const fetchLoginTap2User = createAsyncThunk(
  "user/loginTap2",
  async (params: UserLoginTap2Params) => {
    const { data } = await instance({
      url: "/user/login/password",
      method: "POST",
      data: params,
      headers: getContentType(),
    });
    return data;
  }
);
export const fetchEditUser = createAsyncThunk(
  "user/edit",
  async (params: UserEditParams) => {
    const { data } = await instance({
      url: "/user/edit",
      method: "PATCH",
      headers: getContentType(),
      data: params,
    });
    return data;
  }
);
export const fetchValidUser = createAsyncThunk("user/valid", async () => {
  const { data } = await instance({
    url: "/user",
    method: "GET",
    headers: getContentType(),
  });
  if (data) {
    AuthService.getNewTokens();
    return data;
  }
});
