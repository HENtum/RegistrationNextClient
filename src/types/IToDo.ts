export interface ICreateToDo {
  title: string;
  toDo: string;
}
export interface IEditToDo {
  title: string;
  toDo: string;
  id: string;
}
export type IToDo = {
  id: number;
  title: string;
  toDo: string;
  createdAt: string;
  updatedAt: string;
};
