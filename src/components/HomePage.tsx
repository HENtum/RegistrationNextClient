import React, { useEffect } from "react";
import styles from "@/styles/Home.module.scss";
import { getAccessToken } from "../services/auth.helper";
import { useRouter } from "next/router";
import Meta from "../ui/Meta";
import Form from "./Form";
import { useToDo } from "../hooks/useToDo";
import GetToDo from "./GetToDo";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const data = getAccessToken();
    if (!data) router.replace("/user/login");
  }, []);
  const { openFormI } = useToDo();
  return (
    <>
      <Meta title="Home" description="HomePage" />
      <div className={styles.home}>
        <div className={styles.containerHome}>
          <div className={styles.homeVirst}>
            <GetToDo />

            {openFormI && <Form />}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
