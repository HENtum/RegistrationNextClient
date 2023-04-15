import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserEditParams } from "@/src/redux/slices/userSlice/userTypes";
import styles from "@/styles/Edit.module.scss";
import { getAccessToken } from "@/src/services/auth.helper";
import { useRouter } from "next/router";
import { instance } from "@/src/api/api.interceptor";
import Image from "next/image";
import axios from "@/src/axios";
import Meta from "@/src/ui/Meta";
import { useActions } from "@/src/hooks/useActions";
import { useUser } from "@/src/hooks/useUser";

const EditAc = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const { fetchValidUser, fetchEditUser } = useActions();

  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!getAccessToken()) {
    }
  }, [router, user]);
  const handleChangeFile: any = async (event: any) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      await axios.patch("/user/editAvatar", formData, {
        headers: { token: getAccessToken() },
      });
      if (getAccessToken()) {
        fetchValidUser();
      }
    } catch (error) {
      console.log(error);
      window.location.reload();
      alert("Не удалось загрузить файл");
    }
  };
  const sendParams = async () => {
    try {
      if (name.length > 29 || email.length > 20 || password.length > 54) {
        setErrMessage("Где то поле горит красным");
        setTimeout(() => {
          setErrMessage("Отправить");
        }, 1000);
      } else {
        const sendEmail = email ? email : user?.email;
        const sendName = name ? name : user?.name;
        const params: UserEditParams = {
          email: sendEmail,
          name: sendName,
        };
        if (password.length >= 3) {
          await instance({
            url: "/user/edit/password",
            method: "PATCH",
            data: params,
          });
        }
        fetchEditUser(params);

        if (getAccessToken()) {
          fetchValidUser();
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <>
      <Meta title="Edit" description="Edit page" />
      <div className={styles.edit}>
        <div className={styles.editContainer}>
          <div className={styles.editVirst}>
            <div className={styles.divError}>{errMessage}</div>
            <h1>Редактирование аккаунта</h1>
            <form className={styles.editForm}>
              <label
                className={
                  name.length !== 0
                    ? styles.active || styles.label
                    : styles.label
                }
              >
                Поменять имя:
                <input
                  className={styles.input}
                  type={"text"}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder={user?.name}
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
                    ? styles.active || styles.label
                    : styles.label
                }
              >
                Поменять почту:
                <input
                  className={styles.input}
                  type={"text"}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder={user?.email}
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
                    ? styles.active || styles.label
                    : styles.label
                }
              >
                Поменять пароль:
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  style={
                    password.length > 30
                      ? { borderBottom: "2px solid red" }
                      : {}
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
              <div className={styles.editAvatar}>
                <label className={styles.label}>Установить аватар:</label>
                <Image
                  className={styles.photoAvatar}
                  src={
                    user?.avatar === null || !user
                      ? "/images/avatar.png"
                      : `http://localhost:4000/${user?.avatar}`
                  }
                  alt="avatar"
                  width={40}
                  height={40}
                />
                <Image
                  className={styles.photoIco}
                  src="/images/photo.png"
                  alt="ico"
                  width="30"
                  height="30"
                />
                <input type={"file"} onChange={handleChangeFile} />
              </div>
            </form>

            <div className={styles.editButtons}>
              <div className={styles.buttonCansel}>
                <Link href="/">
                  <button>Отмена</button>
                </Link>
              </div>
              <div className={styles.buttonSubmit}>
                <button onClick={sendParams}>Сохранить изменения</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAc;
