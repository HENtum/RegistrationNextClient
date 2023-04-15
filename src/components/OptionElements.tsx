import React, { FC } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import styles from "@/styles/OptionElements.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToDoService } from "../services/toDo.service";
import { useActions } from "../hooks/useActions";

interface OptionElements {
  id: number;
}

export const OptionElements: FC<OptionElements> = ({ id }) => {
  const { openForm, keyToEdit } = useActions();
  const queryClient = useQueryClient();
  const { mutate: removeItem } = useMutation({
    mutationFn: () => ToDoService.removeToDo(id.toString()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
  const removeToDo = () => {
    const con = confirm("Вы точно хотите удалить этот элемент?");
    if (!con) return;
    else removeItem();
  };
  const editToDo = async () => {
    const con = confirm("Вы точно хотите подредактировать этот элемент?");
    if (!con) return;
    else {
      keyToEdit();
      openForm(id);
    }
  };
  return (
    <div className={styles.root}>
      <AiFillEdit onClick={editToDo} className={styles.editIcon} />
      <AiFillDelete onClick={removeToDo} className={styles.removeIcon} />
    </div>
  );
};
