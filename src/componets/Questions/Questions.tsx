import React from "react";
import styles from "./styles.module.css";
import Question from "../Question/Question";

type QuestionsType = {
  questions: Array<any> | null;
};

const Questions: React.FC<QuestionsType> = ({ questions }) => {
  return (
    <div className={styles.wrapper}>
      {questions &&
        questions.map((question) => (
          <div key={question._id}>
            <Question question={question} />
          </div>
        ))}
    </div>
  );
};

export default Questions;
