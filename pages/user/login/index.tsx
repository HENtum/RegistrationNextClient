import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Login.module.scss";
import Link from "next/link";
import Meta from "@/src/ui/Meta";
import { useActions } from "@/src/hooks/useActions";
import { useUser } from "@/src/hooks/useUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [divValue, setDivValue] = useState("");
  const { fetchLoginUser } = useActions();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user?.id) {
      router.push("/user/login/password");
    }
  }, [user]);

  const sendEmail = async () => {
    if (email.length <= 3) {
      setDivValue("Вы точно ввели почту?");
      setTimeout(() => {
        setDivValue("");
      }, 2500);
    } else if (email.length >= 20) {
      setDivValue("Почта должна быть не больше 20 символов");
      setTimeout(() => {
        setDivValue("");
      }, 2500);
    } else {
      const emailParams = {
        email,
      };
      fetchLoginUser(emailParams);
    }
  };

  return (
    <>
      <Meta title="Login" description="LoginTap1" />
      <div className={styles.login}>
        <div className={styles.loginContainer}>
          <div className={styles.loginVirst}>
            <h1>Авторизация</h1>
            <form className={styles.loginForm}>
              <label
                className={
                  email.length !== 0
                    ? styles.label || styles.active
                    : styles.label
                }
              >
                Email:
                <input
                  className={styles.input}
                  type={"text"}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  style={
                    email.length > 20 ? { borderBottom: "2px solid red" } : {}
                  }
                />
              </label>
            </form>
            <div className={styles.messageDiv}>{divValue}</div>
            <div onClick={() => sendEmail()} className={styles.buttonSubmit}>
              <button>Отправить </button>
              <Link className={styles.whatAcc} href={"/user/register"}>
                <p>Нет аккаунта?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
