import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { UserLoginTap2Params } from "@/src/redux/slices/userSlice/userTypes";
import { fetchLoginTap2User } from "@/src/redux/slices/userSlice/userSlice";
import styles from "@/styles/LoginTap2.module.scss";

import { saveTokenStroage } from "@/src/services/auth.helper";
import { useRouter } from "next/router";
import Image from "next/image";

const LoginTap2 = () => {
  const [password, setPassword] = useState("");
  const user = useSelector((state: RootState) => state.userSlice.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  useEffect(() => {
    if (!user.user?.id) {
      router.push("/user/login");
    }
  }, [router, user.user]);
  const sendParams = async () => {
    if (user.user) {
      const params: UserLoginTap2Params = {
        email: user.user.email,
        password,
      };
      const data = await dispatch(fetchLoginTap2User(params));

      if (data.payload.token) {
        const payload = data.payload.token;
        saveTokenStroage(payload);
        router.push("/");
      }
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <div className={styles.loginVirst}>
          <h1>Авторизация</h1>
          <p className={styles.loginUser}>
            Привет,
            <Image
              className={styles.loginAvatar}
              src={
                user.user?.avatar === null
                  ? "/images/avatar.png"
                  : `http://localhost:4000/${user.user?.avatar}`
              }
              alt="avatar"
              width="60"
              height="60"
            />
            <span>{user.user?.name}</span> введите
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
  );
};

export default LoginTap2;
