import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import styles from "./styles.module.css";
import Header from "@/src/componets/Header/Header";
import Footer from "@/src/componets/Footer/Footer";
import { useRouter } from "next/router";

const RegisterUser = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const validateEmail = (email: string) => {
    // @ privalomas
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // bent vienas skaicius
    const passwordRegex = /^(?=.*[0-9])/;
    return passwordRegex.test(password);
  };
  const onRegister = async () => {
    try {
      if (!name || !surname || !email || !password) {
        setError(
          "All fields are required. Please fill in all the information."
        );
        return;
      }

      if (!validateEmail(email)) {
        setError("Invalid email format. Please enter a valid email address.");
        return;
      }

      if (!validatePassword(password)) {
        setError("Password must contain at least 1 number.");
        return;
      }
      const register = {
        name: name,
        surname: surname,
        email: email,
        password: password,
      };
      console.log("register", register);

      const response = await axios.post(
        "http://localhost:3001/users",
        register
      );
      console.log("response", response);

      if (response.status === 201) {
        Cookie.set("jwt_token", response.data.token);
        setSuccessMessage("Register successful. Redirecting to login...");

        setTimeout(() => {
          router.push("/user-login");
        }, 3000);
      }
    } catch (err) {
      setError("Register failed. Please try again.");
      console.error("Register error:", err);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.formWrapper}>
        {/* <h1 className={styles.formTitle}>Register:</h1> */}
        <div className={styles.form}>
          <label className={styles.label}>Name:</label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className={styles.label}>Surname:</label>
          <input
            className={styles.input}
            type="text"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={styles.label}>Password:</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}
          <button className={styles.button} onClick={onRegister}>
            Register
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterUser;
