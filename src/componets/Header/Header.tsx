import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const Header = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookie.get("jwt_token");
    setUserLoggedIn(savedToken !== undefined);
  }, []);

  const onLogout = () => {
    Cookie.remove("jwt_token");
    router.push("/user-login");
  };

  return (
    <div className={styles.wrapper}>
      <Link href={"/"} className={styles.logo}>
        <div className={styles.logo}>Stackoverflow</div>
      </Link>
      <nav className={styles.navbar}>
        {isUserLoggedIn !== undefined ? (
          isUserLoggedIn ? (
            <>
              <li>
                <Link href="/add-question">Ask a question</Link>
              </li>
              <li>
                <button className={styles.logout} onClick={onLogout}>
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/user-login">Login</Link>
              </li>
              <li>
                <Link href="/register-user">Register</Link>
              </li>
            </>
          )
        ) : (
          <p>Loading...</p>
        )}
      </nav>
    </div>
  );
};

export default Header;
