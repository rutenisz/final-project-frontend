import React from "react";
import styles from "./styles.module.css";
import Answer, { AnswerType, AnswerComponentType } from "../Answer/Answer";

type AnswersType = {
  answers: AnswerType[] | null;
  onDeleteAnswer: (answerId: string) => Promise<void>; // New prop for delete action
};

const Answers: React.FC<AnswersType> = ({ answers, onDeleteAnswer }) => {
  return (
    <div className={styles.wrapper}>
      {answers &&
        answers.map((answer) => (
          <div key={answer._id}>
            <Answer
              answer={answer}
              onDelete={() => onDeleteAnswer(answer._id)}
            />
          </div>
        ))}
    </div>
  );
};

export default Answers;

