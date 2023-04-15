import React, { useEffect, useState } from "react";
import { UserLoginTap2Params } from "@/src/redux/slices/userSlice/userTypes";
import styles from "@/styles/LoginTap2.module.scss";

import { saveTokenStroage } from "@/src/services/auth.helper";
import { useRouter } from "next/router";
import Image from "next/image";
import Meta from "@/src/ui/Meta";
import { useActions } from "@/src/hooks/useActions";
import { useUser } from "@/src/hooks/useUser";

const LoginTap2 = () => {
  const [password, setPassword] = useState("");
  const { fetchLoginTap2User } = useActions();
  const { user, token } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user?.id) {
      router.push("/user/login");
    }
    if (token?.accessToken) {
      saveTokenStroage(token);
      router.push("/");
    }
  }, [router, user, token]);
  const sendParams = async () => {
    if (user.id) {
      const params: UserLoginTap2Params = {
        email: user?.email,
        password,
      };
      fetchLoginTap2User(params);
    }
  };
  return (
    <>
      <Meta title="password" description="LoginTap2" />
      <div className={styles.login}>
        <div className={styles.loginContainer}>
          <div className={styles.loginVirst}>
            <h1>Авторизация</h1>
            <p className={styles.loginUser}>
              Привет,
              <Image
                className={styles.loginAvatar}
                src={
                  user?.avatar === null
                    ? "/images/avatar.png"
                    : `http://localhost:4000/${user?.avatar}`
                }
                alt="avatar"
                width="60"
                height="60"
              />
              <span>{user?.name}</span> введите
            </p>
            <form className={styles.loginForm}>
              <label
                className={
                  password.length !== 0
                    ? styles.label || styles.active
                    : styles.label
                }
              >
                Пароль:
                <input
                  className={styles.input}
                  type={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
            </form>
            <div onClick={sendParams} className={styles.buttonSubmit}>
              <button>Отправить </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginTap2;
