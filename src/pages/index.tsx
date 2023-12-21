import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import Header from "../componets/Header/Header";
import Footer from "../componets/Footer/Footer";
import Questions from "../componets/Questions/Questions";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<Array<any> | null>(null);
  console.log(questions);
  const fetchQuestions = async () => {
    try {
      const headers = {
        authorization: Cookie.get("jwt_token"),
      };
      const response = await axios.get("http://localhost:3001/questions", {
        headers,
      });
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
