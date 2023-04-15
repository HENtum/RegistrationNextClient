import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  openFormI: boolean;
  key: string;
  toDoId: number;
}

const initialState: InitialState = {
  openFormI: false,
  key: "create",
  toDoId: 0,
};

const ToDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    openForm(state, { payload }) {
      state.toDoId = payload;
      state.openFormI = true;
    },
    closeForm(state) {
      state.openFormI = false;
    },
    keyToCreate(state) {
      state.key = "create";
    },
    keyToEdit(state) {
      state.key = "edit";
    },
  },
});

export default ToDoSlice;
