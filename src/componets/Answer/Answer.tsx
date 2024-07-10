import React from "react";
import styles from "./styles.module.css";

type AnswerType = {
  _id: string;
  answer_text: string;
  date: Date;
  gained_likes_number: number;
  onDelete: () => void; // callback function for deletion
};

type AnswerComponentType = {
  answer: AnswerType;
  onDelete: () => void;
};

const Answer: React.FC<AnswerComponentType> = ({ answer, onDelete }) => {
  const formattedDate = answer.date.toLocaleString();
  return (
    <div className={styles.wrapper}>
      <div className={styles.answer_text}>{answer.answer_text}</div>
      <div className={styles.date}>{formattedDate}</div>
      <div className={styles.gained_likes_number}>
        {answer.gained_likes_number}
      </div>
      <button className={styles.deleteButton} onClick={onDelete}>
        Delete Answer
      </button>
    </div>
  );
};

export default Answer;
export type { AnswerType, AnswerComponentType };

// import React from "react";
// import styles from "./styles.module.css";

// type AnswerType = {
//   _id: string;
//   answer_text: string;
//   date: Date;
//   gained_likes_number: number;
//   onDelete: () => void; //callbackine funkcija istrynimui
// };

// type AnswerComponentType = {
//   answer: AnswerType;
// };

// const Answer: React.FC<AnswerComponentType> = ({ answer }) => {
//   const formattedDate = answer.date.toLocaleString();
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.answer_text}>{answer.answer_text}</div>
//       <div className={styles.date}>{formattedDate}</div>
//       <div className={styles.gained_likes_number}>
//         {answer.gained_likes_number}
//       </div>
//       <button className={styles.deleteButton} onClick={answer.onDelete}>
//         Delete Answer
//       </button>
//     </div>
//   );
// };

// export default Answer;
// export type { AnswerType, AnswerComponentType };
