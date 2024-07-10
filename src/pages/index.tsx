import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import Header from "../componets/Header/Header";
import Footer from "../componets/Footer/Footer";
import Questions from "../componets/Questions/Questions";
import { useRouter } from "next/router";

type QuestionType = {
  _id: string;
  title: string;
  question_text: string;
  date: Date;
  answered: boolean;
  // user_id: string;
};

export default function LandingPage() {
  // const router = useRouter();

  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<
    QuestionType[] | null
  >(null);
  const [showAnswered, setShowAnswered] = useState(false);

  // console.log(questions);

  const fetchQuestions = async () => {
    try {
      const headers = {
        authorization: Cookie.get("jwt_token"),
      };
      const response = await axios.get("http://localhost:3001/questions", {
        headers,
      });
      console.log("quest:", response.data.questions);

      setQuestions(response.data.questions);
    } catch (err: any) {
      console.log("Err:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <Header />
      <Questions questions={questions} />
      <Footer />
    </>
  );
}
