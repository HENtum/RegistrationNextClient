import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ToDoService } from "../services/toDo.service";
import ToDoItem from "./ToDoItem";
import { IToDo } from "../types/IToDo";
import styles from "@/styles/GetToDo.module.scss";

const GetToDo = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["todos"],
    queryFn: ToDoService.getForUser,
  });
  console.log(data);
  return (
    <div className={styles.divForItem}>
      {data?.length === 0 && <h1>Нету списков дел</h1>}
      {data ? (
        isSuccess &&
        data.map((obj: IToDo) => <ToDoItem key={obj.id} {...obj} />)
      ) : (
        <h1>Загрузка...</h1>
      )}
    </div>
  );
};

export default GetToDo;
