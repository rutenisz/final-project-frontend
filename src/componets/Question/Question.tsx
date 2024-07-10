import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Answer from "../Answer/Answer";
import { AnswerType } from "../Answer/Answer";

type QuestionType = {
  _id: string;
  title: string;
  question_text: string;
  date: Date;
  answers: AnswerType[];
  // user_id: string;
};

type QuestionComponentType = {
  question: QuestionType;
};

const Question: React.FC<QuestionComponentType> = ({ question }) => {
  const formattedDate = question.date.toLocaleString(); // convert the Date object to a string or another ReactNode type that React can render.

  return (
    <Link href={`/question/${question._id}`} className={styles.link}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{question.title}</div>
        <div className={styles.question_text}>{question.question_text}</div>
        <div className={styles.date}>{formattedDate}</div>
      </div>
    </Link>
  );
};

export default Question;
