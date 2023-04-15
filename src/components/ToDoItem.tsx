import React, { FC } from "react";
import styles from "@/styles/ToDoItem.module.scss";
import { OptionElements } from "./OptionElements";

interface ToDoItem {
  title: string;
  toDo: string;
  id: number;
}

const ToDoItem: FC<ToDoItem> = ({ title, toDo, id }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.toDo}>{toDo}</p>
      <div className={styles.optionElements}>
        <OptionElements id={id} />
      </div>
    </div>
  );
};

export default ToDoItem;
