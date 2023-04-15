import React, { useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/404.module.scss";
import { useRouter } from "next/router";
import Meta from "@/src/ui/Meta";

const Undefined = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <>
      <Meta title="Not Found" description="This page not founded" />
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
    </>
  );
};
export default Undefined;
