import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";
import Header from "@/src/componets/Header/Header";
import Footer from "@/src/componets/Footer/Footer";
import styles from "./styles.module.css";
import { log } from "console";

type QuestionType = {
  _id: string;
  title: string;
  question_text: string;
  date: Date;
  // user_id: string;
};

const Question = () => {
  const [question, setQuestion] = useState<QuestionType | null>(null);

  const router = useRouter();

  const fetchQuestion = async (id: string) => {
    try {
      const headers = {
        authorization: Cookie.get("jwt_token"),
      };

      const response = await axios.get(
        `http://localhost:3001/questions/${id}`,
        { headers }
      );

      setQuestion(response.data.question);
      console.log(response.data.question);
    } catch (err: any) {
      console.log("Err:", err);
    }
  };

  useEffect(() => {
    router.query.id && fetchQuestion(router.query.id as string);
  }, [router.query.id]);

  const formattedDate =
    question && question.date
      ? question.date.toLocaleString()
      : "No date available";

  return (
    <div>
      <Header />
      {question ? (
        <div className={styles.wrapper}>
          <div className={styles.question}>
            <h1 className={styles.title}>{question.title}</h1>
            <div className={styles.question_text}>{question.question_text}</div>
            <div className={styles.date}>{formattedDate}</div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </div>
  );
};

export default Question;
