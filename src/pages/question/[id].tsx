import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";
import Header from "@/src/componets/Header/Header";
import Footer from "@/src/componets/Footer/Footer";
import styles from "./styles.module.css";
import Answers from "@/src/componets/Answers/Answers";

type AnswerType = {
  _id: string;
  answer_text: string;
  date: Date;
  gained_likes_number: number;
  onDelete: () => void;
};

type QuestionType = {
  _id: string;
  title: string;
  question_text: string;
  date: Date;
  // user_id: string;
};

type QuestionAndAnswerType = {
  questions: QuestionType;
  answers: AnswerType[];
};

const AddAnswer = () => {
  const [answerText, setAnswerText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  const { id } = router.query;

  const validateForm = () => {
    if (!answerText) {
      setValidationError("Answer text is required!");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const onAddAnswer = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const answer = {
      answer_text: answerText,
      question_id: id,
      date: new Date(),
    };

    const headers = {
      authorization: Cookie.get("jwt_token"),
    };

    try {
      const response = await axios.post(
        `http://localhost:3001/question/${id}/answers`,
        answer,
        {
          headers,
        }
      );

      setLoading(false);

      if (response.status === 200) {
        setSuccessMessage("Answer added successfully!");
        setTimeout(() => setSuccessMessage(null), 5000);
        setAnswerText("");
        router.reload();
      }
    } catch (err) {
      console.error("Error adding answer:", err);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.formTitle}>Add an Answer:</h1>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <div className={styles.form}>
        <label className={styles.label}>Answer:</label>
        <textarea
          className={styles.input}
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        ></textarea>

        {validationError && <p className={styles.error}>{validationError}</p>}
        <button className={styles.button} onClick={onAddAnswer}>
          Add Answer
        </button>
      </div>
    </div>
  );
};

const Question = () => {
  const [question_with_answers, setQuestionWithAnswer] =
    useState<QuestionAndAnswerType | null>(null);

  const router = useRouter();

  const fetchQuestion = async (id: string) => {
    try {
      const headers = {
        authorization: Cookie.get("jwt_token"),
      };

      const response = await axios.get(
        `http://localhost:3001/questions/${id}/answers`,
        { headers }
      );

      setQuestionWithAnswer(response.data.question_with_answers);
      // console.log(response.data.question_with_answers);
    } catch (err: any) {
      console.log("Err:", err);
    }
  };
  console.log("qwa", question_with_answers);

  useEffect(() => {
    router.query.id && fetchQuestion(router.query.id as string);
  }, [router.query.id]);

  const onDeleteQuestion = async () => {
    const headers = {
      authorization: Cookie.get("jwt_token"),
    };
    try {
      const response = await axios.delete(
        `http://localhost:3001/questions/${router.query.id}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        alert("Question deleted successfully!");
        router.push("/");
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };
  const onDeleteAnswer = async (answerId: string) => {
    const headers = {
      authorization: Cookie.get("jwt_token"),
    };

    try {
      const response = await axios.delete(
        `http://localhost:3001/answer/${answerId}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        alert("Answer deleted successfully!");
        setQuestionWithAnswer((prev) => {
          if (prev) {
            return {
              ...prev,
              answers: prev.answers.filter((answer) => answer._id !== answerId),
            };
          }
          return null;
        });
      }
      // router.reload();
    } catch (err) {
      console.error("Error deleting answer:", err);
    }
  };

  return (
    <div>
      <Header />
      {question_with_answers ? (
        <div>
          <div className={styles.wrapper}>
            <div className={styles.question}>
              <h1 className={styles.title}>
                {question_with_answers.questions.title}
              </h1>
              <div className={styles.question_text}>
                {question_with_answers.questions.question_text}
              </div>
              <div className={styles.date}>
                {question_with_answers.questions.date.toLocaleString() ||
                  "No date available"}
              </div>
              {Cookie.get("jwt_token") && (
                <button
                  className={styles.deleteButton}
                  onClick={onDeleteQuestion}
                >
                  Delete Question
                </button>
              )}
            </div>

            <div className={styles.answerSection}>
              <h2 className={styles.answersTitle}>Answers:</h2>
              <Answers
                answers={question_with_answers?.answers}
                onDeleteAnswer={onDeleteAnswer}
              />
            </div>
          </div>

          {Cookie.get("jwt_token") && <AddAnswer />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </div>
  );
};

export default Question;
