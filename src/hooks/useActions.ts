import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import userSlice from "../redux/slices/userSlice/userSlice";
import * as userActions from "../redux/actions/user.action";
import ToDoSlice from "../redux/slices/toDoSlice/toDoSlice";

const rootActions = {
  ...userSlice.actions,
  ...userActions,
  ...ToDoSlice.actions,
};

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
