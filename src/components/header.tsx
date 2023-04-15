import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAccessToken, removeTokenStorage } from "../services/auth.helper";
import { useRouter } from "next/router";
import styles from "@/styles/Header.module.scss";
import Image from "next/image";
import { useUser } from "../hooks/useUser";
import { useActions } from "../hooks/useActions";

export const Header = () => {
  const { openForm, keyToCreate } = useActions();
  const [isView, setIsView] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const pathname = router.pathname;
  useEffect(() => {
    const data = getAccessToken();
    if (data) {
      setIsView(true);
    }
  }, [getAccessToken()]);
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div
          className={styles.headerVirst}
          style={
            isView
              ? { justifyContent: "space-between" }
              : { justifyContent: "flex-end" }
          }
        >
          {isView && (
            <>
              <Link href="/user/edit">
                <div className={styles.aboutUser}>
                  <Image
                    className={styles.headerAvatar}
                    src={
                      user?.avatar === null
                        ? "/images/avatar.png"
                        : `http://localhost:4000/${user?.avatar}`
                    }
                    alt="avatar"
                    width="60"
                    height="60"
                  />

                  <div>
                    <div className={styles.headerName}>{user?.name}</div>
                    <div className={styles.headerEmail}>{user?.email}</div>
                  </div>
                </div>
              </Link>

              <div className={styles.forButton}>
                <button
                  onClick={() => {
                    keyToCreate();
                    openForm(0);
                  }}
                  className={styles.button}
                >
                  Создать заметку
                </button>
              </div>
            </>
          )}
          {!isView ? (
            <div className={styles.buttons}>
              <div className={styles.button}>
                <Link href="/user/login">
                  <button disabled={pathname === "/user/login"}>
                    Авторизация
                  </button>
                </Link>
              </div>
              <div className={styles.button}>
                <Link href="/user/register">
                  <button disabled={pathname === "/user/register"}>
                    Регистрация
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.headerExit}>
              <button
                onClick={() => {
                  removeTokenStorage();
                  window.location.reload();
                }}
              >
                Выйти из аккаунта
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
