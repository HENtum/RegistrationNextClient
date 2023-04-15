import Cookies from "js-cookie";
import { useEffect } from "react";
import { removeTokenStorage } from "../services/auth.helper";
import { Header } from "./header";
import MessageLabel from "./messageLabel";
import { useActions } from "../hooks/useActions";
import { useUser } from "../hooks/useUser";
import styles from "@/styles/Layout.module.scss";

export default function Layout({ children }: any) {
  const { fetchValidUser } = useActions();
  const { user, message, token } = useUser();
  useEffect(() => {
    const getToken = async () => {
      const token = Cookies.get("accessToken");
      if (token) {
        fetchValidUser();
        if (user === undefined) removeTokenStorage();
      } else {
        return;
      }
    };
    getToken();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.children}>{children}</div>
      {message && <MessageLabel />}
    </>
  );
}
