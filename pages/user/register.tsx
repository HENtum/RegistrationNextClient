import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCreateUser } from "@/src/redux/slices/userSlice/userSlice";
import { UserCreateParams } from "@/src/redux/slices/userSlice/userTypes";
import { AppDispatch } from "@/src/redux/store";
import { saveTokenStroage } from "@/src/services/auth.helper";
import styles from "@/styles/Register.module.scss";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonValue, setButtonValue] = useState("Отправить");
  const [buttonColor, setButtonColor] = useState("rgb(72, 193, 245)");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const sendParams = async () => {
    if (name.length <= 3 || email.length <= 3 || password.length <= 4) {
      setButtonValue("Где то не веденны данные или где то мало символов");
      setButtonColor("rgb(72, 245, 90)");
      setTimeout(() => {
        setButtonValue("Отправить");
        setButtonColor("rgb(72, 193, 245)");
      }, 2000);
    } else if (name.length > 29 || email.length > 20 || password.length > 54) {
      setButtonValue("Где то поле горит красным");
      setButtonColor("rgb(72, 245, 90)");
      setTimeout(() => {
        setButtonValue("Отправить");
        setButtonColor("rgb(72, 193, 245)");
      }, 1000);
    } else {
      const params: UserCreateParams = {
        email,
        name,
        password,
      };
      const data = await dispatch(fetchCreateUser(params));
      if (data.payload.token) {
        console.log(data.payload);
        const payload = data.payload.token;
        saveTokenStroage(payload);
        router.push("/");
      }
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.registerContainer}>
        <div className={styles.registerVirst}>
          <h1>Регистрация</h1>
          <form className={styles.registerForm}>
            <label
              className={
                name.length !== 0 ? styles.label || styles.active : styles.label
              }
            >
              Имя:
              <input
                className={styles.input}
                type={"text"}
                onChange={(e) => setName(e.target.value)}
                value={name}
                style={
                  name.length >= 10 ? { borderBottom: "2px solid red" } : {}
                }
              />
              {name && (
                <p onClick={() => setName("")} className={styles.clearInput}>
                  x
                </p>
              )}
            </label>
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
              {email && (
                <p onClick={() => setEmail("")} className={styles.clearInput}>
                  x
                </p>
              )}
            </label>
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
                type="password"
                name="password"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={
                  password.length > 30 ? { borderBottom: "2px solid red" } : {}
                }
              />
              {password && (
                <p
                  onClick={() => setPassword("")}
                  className={styles.clearInput}
                >
                  x
                </p>
              )}
            </label>
          </form>
          <div
            onClick={sendParams}
            className={styles.buttonSubmit}
            onMouseEnter={() =>
              buttonColor !== "rgb(72, 245, 90)" && setButtonColor("#ffffff")
            }
            onMouseLeave={() =>
              buttonColor !== "rgb(72, 245, 90)" &&
              setButtonColor("rgb(72, 193, 245)")
            }
          >
            <button style={{ backgroundColor: buttonColor }}>
              {buttonValue}
            </button>
            <Link className={styles.whatAcc} href={"/user/login"}>
              <p>Уже есть аккаунт?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
