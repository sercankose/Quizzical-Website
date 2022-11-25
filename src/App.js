import "./App.css";

import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import { nanoid } from "nanoid";

function App() {
  const [changer, setChanger] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectingAnswer, setSelectingAnswer] = useState({});
  const [checkAnswerText, setCheckAnswerText] = useState(false);
  const [checkAnswerCount, setcheckAnswerCount] = useState();

  const decodeHTML = function (html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  async function fetchQuestionsData() {
    const dataArray = [];
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple"
    );
    const data = await response.json();
    data.results.map((item) => {
      dataArray.push({
        id: nanoid(),
        answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
        question: decodeHTML(item.question),
        correct: decodeHTML(item.correct_answer),
      });
    });
    setQuestions(dataArray);
  }

  const questionsHTML = questions.map((data) => {
    return (
      <Question
        key={data.id}
        id={data.id}
        question={data.question}
        answer={data.answers}
        allData={data}
        correct={data.correct}
        selectingAnswerInfo={selectingAnswer}
        correctAnswerClass={checkAnswerText}
        handleClick={handleOnCLick}
        decodeHTML={decodeHTML}
      />
    );
  });

  function handleOnCLick(e) {
    const selectedAnswer = e.currentTarget.name;
    const questionId = e.currentTarget.id;
    setSelectingAnswer({
      ...selectingAnswer,
      [questionId]: selectedAnswer,
    });
  }

  function checkAnswer() {
    const selectedAnswerArray = Object.values(selectingAnswer);
    let count = 0;
    setCheckAnswerText(true);
    questions.map(
      (item) => selectedAnswerArray.includes(item.correct) && count++
    );
    setcheckAnswerCount(count);
  }

  function playAgain() {
    setCheckAnswerText(false);
    setSelectingAnswer({});
    return fetchQuestionsData();
  }

  function startQuiz() {
    fetchQuestionsData();
    setChanger((changer) => !changer);
  }

  return changer ? (
    <div>
      <div>{questionsHTML}</div>
      {checkAnswerText && (
        <div className="after-check-answer">
          <p>
            You scored {checkAnswerCount}/5 correct answer
            {checkAnswerCount > 1 && "s"}
          </p>
          <button className="play-again-button" onClick={playAgain}>
            Play Again!
          </button>
        </div>
      )}
      {!checkAnswerText && (
        <button className="check-answer" onClick={() => checkAnswer()}>
          Check Answer
        </button>
      )}
    </div>
  ) : (
    <main className="start-page">
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={startQuiz}>Start quiz</button>
    </main>
  );
}

export default App;
