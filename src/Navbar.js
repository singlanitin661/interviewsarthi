import React, { useState, useEffect } from 'react';
import "./Navbar.modules.css"

function Navbar() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(3);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(counter / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((counter % 3600) / 60).toString().padStart(2, '0');
  const seconds = (counter % 60).toString().padStart(2, '0');
  const counterDisplay = `${hours}:${minutes}:${seconds}`;

  return (
    <nav>
      <div className="question-section">{`${currentQuestion}/${totalQuestions}`}</div>
      <div className="logo">InterviewSarthi</div>
      <div className="timer">{counterDisplay}</div>
    </nav>
  );
}

export default Navbar;
