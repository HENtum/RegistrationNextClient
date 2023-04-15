import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSlice from "./slices/userSlice/userSlice";
import ToDoSlice from "./slices/toDoSlice/toDoSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    toDo: ToDoSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
