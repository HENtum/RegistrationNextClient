import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "../redux/slices/userSlice/userSlice";
import { RootState } from "../redux/store";

import styles from "@/styles/MessageLabel.module.scss";

const MessageLabel = () => {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(deleteMessage());
    }, 2500);
  }, [user.message, dispatch]);
  return (
    <div className={styles.messageLabel}>
      <div className={styles.messageVirst}>{user.message}</div>
    </div>
  );
};

export default MessageLabel;
