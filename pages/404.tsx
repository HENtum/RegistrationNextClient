import React, { useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/404.module.scss";
import { useRouter } from "next/router";

const Undefined = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <div className={styles.undefined}>
      <div className={styles.undefinedContainer}>
        <div className={styles.undefinedVirst}>
          <h1>Страница не найденна</h1>
          <div className={styles.buttonUndefined}>
            <Link href="/">
              <button>Вернуться на главную страницу</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Undefined;
