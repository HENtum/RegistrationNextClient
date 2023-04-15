import React, { useState } from "react";
import styles from "@/styles/Form.module.scss";
import { useActions } from "../hooks/useActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToDoService } from "../services/toDo.service";
import { useToDo } from "../hooks/useToDo";

const Form = () => {
  const { key, toDoId } = useToDo();
  const [title, setTitle] = useState("");
  const [toDo, setToDo] = useState("");
  const { closeForm } = useActions();
  const queryClient = useQueryClient();
  const params = {
    title,
    toDo,
  };
  const paramsForEdit = {
    title,
    toDo,
    id: toDoId.toString(),
  };

  const { mutate: sendToDo } = useMutation({
    mutationFn: () => ToDoService.createToDo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }), closeForm();
    },
  });
  const { mutate: editToDo } = useMutation({
    mutationFn: () => ToDoService.editToDo(paramsForEdit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }), closeForm();
    },
  });
  return (
    <div className={styles.root}>
      <form className={styles.form}>
        <label className={styles.label1}>
          Тема:
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Тема..."
          />
        </label>
        <label className={styles.label2}>
          Запись:
          <textarea
            onChange={(e) => setToDo(e.target.value)}
            placeholder="Запись"
          />
        </label>
        <div className={styles.btDiv}>
          <button onClick={() => closeForm()} className={styles.bt}>
            Отмена
          </button>
          <button
            className={styles.bt}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (key === "create") sendToDo();
              else if (key === "edit") editToDo();
            }}
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
