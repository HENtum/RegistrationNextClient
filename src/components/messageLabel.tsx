import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import styles from "@/styles/MessageLabel.module.scss";
import { useActions } from "../hooks/useActions";

const MessageLabel = () => {
  const { deleteMessage } = useActions();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      deleteMessage();
    }, 2500);
  }, [user.message, dispatch]);
  return (
    <div className={styles.messageLabel}>
      <div className={styles.messageVirst}>{user.message}</div>
    </div>
  );
};

export default MessageLabel;
