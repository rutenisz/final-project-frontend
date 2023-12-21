import React, { useState } from "react";
import styles from "./styles.module.css";
import Header from "@/src/componets/Header/Header";
import Footer from "@/src/componets/Footer/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const AddQuestion = () => {
  const [isLoading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [question_text, setQuestionText] = useState("");
  const [date, setDate] = useState<Date>();

  const router = useRouter();

  const [validationError, setValidationError] = useState<string | null>(null);

  const validateForm = () => {
    if (!title || !question_text || !date) {
      setValidationError("All fields are required!");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const onAddQuestion = async () => {
    if (!validateForm) {
      return;
    }

    setLoading(true);

    const question = {
      title: title,
      question_text: question_text,
      date: new Date(),
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/questions",
        question
      );
      console.log(response);

      setLoading(false);

      if (response.status === 200) {
        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    } catch (err) {
      console.error("Error adding question:", err);
    }
  };
  return (
    <div>
      <Header />
      <div className={styles.formWrapper}>
        <h1 className={styles.formTitle}>Ask a question:</h1>

        <div className={styles.form}>
          <label className={styles.label}>Title:</label>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className={styles.label}>Question:</label>
          <textarea
            className={styles.input}
            value={question_text}
            onChange={(e) => setQuestionText(e.target.value)}
          ></textarea>

          <label className={styles.label}>Date:</label>
          <input
            className={styles.input}
            type="datetime-local"
            value={date ? date.toISOString().split(".")[0] : ""}
            onChange={(e) =>
              setDate(e.target.value ? new Date(e.target.value) : undefined)
            }
            min={new Date().toISOString().split(".")[0]}
          />

          {validationError && <p className={styles.error}>{validationError}</p>}
          <button className={styles.button} onClick={onAddQuestion}>
            Add question
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddQuestion;
