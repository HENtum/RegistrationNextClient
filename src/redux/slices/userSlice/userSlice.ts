import { instance } from "@/src/api/api.interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getContentType } from "../../../api/api.helper";
import { AuthService } from "../../../services/auth.service";
import {
  UserCreateParams,
  UserEditParams,
  UserLoginTap2Params,
} from "./userTypes";

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
interface InititalState {
  user: {
    user: {
      id: null | number;
      name: string;
      email: string;
      avatar: string | null;
      createdAt: string;
      updatedAt: string;
    };
    token: {
      accessToken: string;
      refreshToken: string;
    };
    message: string;
  };
}

const initialState: InititalState = {
  user: {
    user: {
      id: null,
      name: "",
      email: "",
      avatar: null,
      createdAt: "",
      updatedAt: "",
    },
    token: {
      accessToken: "",
      refreshToken: "",
    },
    message: "",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteMessage(state) {
      state.user.message = "";
    },
  },
  extraReducers: (builder) => {
    return (
      //createUser
      builder.addCase(fetchCreateUser.pending, (state) => {
        state.user.message = "Загрузка";
      }),
      builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.user.message = "Успешно";
        state.user = action.payload;
      }),
      builder.addCase(fetchCreateUser.rejected, (state, action) => {
        state.user.message = action.payload as string;
      }),
      //loginUserTap1
      builder.addCase(fetchLoginUser.pending, (state) => {
        state.user.message = "loading";
      }),
      builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.user.message = "success";
        state.user = action.payload;
      }),
      builder.addCase(fetchLoginUser.rejected, (state, action) => {
        state.user.message = action.payload as string;
      }),
      //loginUserTap2
      builder.addCase(fetchLoginTap2User.pending, (state, action) => {
        state.user.message = "loading";
      }),
      builder.addCase(fetchLoginTap2User.fulfilled, (state, action) => {
        state.user.message = "success";
        state.user = action.payload;
      }),
      builder.addCase(fetchLoginTap2User.rejected, (state, action) => {
        state.user.message = action.payload as string;
      }),
      //editUser
      builder.addCase(fetchEditUser.pending, (state) => {
        state.user.message = "loading";
      }),
      builder.addCase(fetchEditUser.fulfilled, (state, action) => {
        state.user.message = "success";
        state.user = action.payload;
      }),
      builder.addCase(fetchEditUser.rejected, (state, action) => {
        state.user.message = action.payload as string;
      }),
      //validUser
      builder.addCase(fetchValidUser.pending, (state) => {
        state.user.message = "loading";
      }),
      builder.addCase(fetchValidUser.fulfilled, (state, action) => {
        state.user.message = "success";
        state.user = action.payload;
      }),
      builder.addCase(fetchValidUser.rejected, (state) => {
        state.user.message = "unauthorized" as string;
      })
    );
  },
});

export const { deleteMessage } = userSlice.actions;
export default userSlice.reducer;
