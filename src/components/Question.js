import React, { useState } from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const answerForClass = Object.values(props.selectingAnswerInfo);

  return (
    <div className="question-page">
      <h1>{props.question}</h1>
      <div className="answers-container">
        {props.answer.map((item) => {
          const decodedAnswer = props.decodeHTML(item);
          return (
            <button
              key={nanoid()}
              id={props.id}
              name={decodedAnswer}
              onClick={(e) => props.handleClick(e)}
              className={
                props.correctAnswerClass && props.correct === decodedAnswer
                  ? "correct-answer"
                  : props.correctAnswerClass &&
                    answerForClass.includes(decodedAnswer) &&
                    props.correct !== decodedAnswer
                  ? "wrong-answer"
                  : props.correctAnswerClass
                  ? "not-selecting-answer"
                  : answerForClass.includes(decodedAnswer)
                  ? "selecting-answer"
                  : "button-first-condition"
              }
            >
              {decodedAnswer}
            </button>
          );
        })}
      </div>
    </div>
  );
}
