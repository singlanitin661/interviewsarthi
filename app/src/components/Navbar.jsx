import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({ totalCount = 4 }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);
  const isStarted = useSelector((state) => state.start.value);
  const currCount = useSelector((state) => state.count.count);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const startTimer = () => {
    startTimeRef.current = Date.now() - timer * 1000;
    timerRef.current = setInterval(() => {
      const elapsedTime = Math.floor(
        (Date.now() - startTimeRef.current) / 1000
      );
      setTimer(elapsedTime);
    }, 1000);
  };

  const handleTimerClick = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      pausedTimeRef.current = timer;
      setIsRunning(false);
    } else {
      setIsRunning(true);
      startTimer();
    }
  };

  useEffect(() => {
    if (isStarted) {
      startTimer();
    } else {
      clearInterval(timerRef.current);
      setTimer(0);
    }
    if (currCount === totalCount + 1) {
      clearInterval(timerRef.current);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isStarted, currCount, totalCount]);

  const takeMeToHome = ()=>{
    navigate("/")
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-black text-xl text-white hover:cursor-pointer" onClick={takeMeToHome}>
      <div className="flex justify-center align-center py-4">
        <button>
          <h6 className={`w-[50px] ${isStarted ? "" : "hidden"}`}>
            {`${currCount}/${totalCount}`}
          </h6>
        </button>
        <h6 className="font-bold ml-[35vw] mr-[35vw]"> InterviewSarthi </h6>
        <button>
          <h6 className={`w-[50px] ${isStarted ? "" : "hidden"}`}>
            {formatTime(timer)}
          </h6>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
