import React, { useState } from "react";
import "./Chatbot.modules.css";

const Chatbot = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "What is the capital of France?",
      answer: "Paris",
      attempts: 2,
    },
    {
      id: 2,
      text: "What is the largest planet in our solar system?",
      answer: "Jupiter",
      attempts: 2,
    },
    {
      id: 3,
      text: "What is the smallest country in the world?",
      answer: "Vatican City",
      attempts: 2,
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (event) => {
    setCurrentAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      currentAnswer.trim().toLowerCase() ===
      questions[currentQuestionIndex].answer.toLowerCase()
    ) {
      setShowAnswer(true);
      setIsCorrectAnswer(true);
      setCurrentAnswer("");
      setChatHistory([
        ...chatHistory,
        {
          question: questions[currentQuestionIndex].text,
          answer: currentAnswer,
          isCorrect: true,
        },
      ]);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowAnswer(false);
        setIsCorrectAnswer(false);
      }, 1000);
    } else {
      const newQuestions = [...questions];
      newQuestions[currentQuestionIndex].attempts -= 1;
      if (newQuestions[currentQuestionIndex].attempts === 0) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
      setQuestions(newQuestions);
      setShowAnswer(true);
      setIsCorrectAnswer(false);
      setCurrentAnswer("");
      setChatHistory([
        ...chatHistory,
        {
          question: questions[currentQuestionIndex].text,
          answer: currentAnswer,
          isCorrect: false,
        },
      ]);
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-container">
        <div className="chatbot-history-container">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`chatbot-message-container ${
                chat.isCorrect ? "chatbot-left" : "chatbot-right"
              }`}
            >
              <div
                className={`chatbot-message ${
                  chat.isCorrect ? "chatbot-response" : "chatbot-user"
                }`}
              >
                {chat.isCorrect ? chat.answer : `${chat.answer} (Incorrect)`}
              </div>
            </div>
          ))}
        </div>
        <div className="chatbot-message-container chatbot-left">
          <div className="chatbot-message chatbot-response">
            {questions[currentQuestionIndex].text}
          </div>
        </div>
        <div className="chatbot-message-container chatbot-right">
          <form onSubmit={handleSubmit} className="chatbot-form">
            <div className="chatbot-input-container">
              <input
                type="text"
                name="answer"
                id="answer"
                placeholder="Enter your answer here"
                value={currentAnswer}
                onChange={handleInputChange}
              />
              <button type="submit" className="chatbot-submit">
                <img src="https://cdn-icons-png.flaticon.com/128/786/786205.png" alt="Submit" />
              </button>
            </div>
          </form>
        </div>
        {showAnswer && (
          <div className="chatbot-message-container chatbot-left">
            <div
              className={`chatbot-message ${
                isCorrectAnswer ? "chatbot-response" : "chatbot-error"
              }`}
            >
              {isCorrectAnswer ? "Correct!" : "Incorrect. Please try again."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
