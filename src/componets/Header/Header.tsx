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

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>Stackoverflow</div>
      <nav className={styles.navbar}>
        {isUserLoggedIn !== undefined ? (
          <>
            <li>
              <Link href="/user-login">Login</Link>
            </li>
            <li>
              <Link href="/register-user">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/add-question">Ask a question</Link>
          </li>
        )}
      </nav>
    </div>
  );
};

export default Header;
