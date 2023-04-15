import { getContentType } from "../api/api.helper";
import instance from "@/src/axios";
import { ICreateToDo, IEditToDo } from "../types/IToDo";

export const ToDoService = {
  async getForUser() {
    const { data } = await instance({
      url: "/toDo",
      method: "GET",
      headers: getContentType(),
    });
    return data;
  },
  async createToDo(params: ICreateToDo) {
    const { data } = await instance({
      url: "/toDo/create",
      method: "POST",
      data: params,
      headers: getContentType(),
    });
    return data;
  },
  async editToDo(params: IEditToDo) {
    const { data } = await instance({
      url: "/toDo/edit",
      method: "PATCH",
      data: params,
      headers: getContentType(),
    });
    return data;
  },
  async removeToDo(id: string) {
    const { data } = await instance({
      url: "/toDo/remove",
      method: "DELETE",
      data: { id },
      headers: getContentType(),
    });
    return data;
  },
};
