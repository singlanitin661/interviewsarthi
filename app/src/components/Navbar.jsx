import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = ({ totalCount = 4 }) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);
  const isStarted = useSelector((state) => state.start.value);
  const currCount = useSelector((state) => state.count.count);
  const toShowEverything = useSelector((store) => store.report.toShowEveryhing);

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
      const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setTimer(elapsedTime + pausedTimeRef.current); // Consider paused time
    }, 1000);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    pausedTimeRef.current += timer; // Store elapsed time when paused
    setIsRunning(false);
  };

  useEffect(() => {
    if (isStarted && !toShowEverything) {
      startTimer();
    } else {
      pauseTimer();
    }
  }, [isStarted, toShowEverything]);

  useEffect(() => {
    if (toShowEverything) {
      pauseTimer();
    }
  }, [toShowEverything]);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0d0d0d] text-xl text-white hover:cursor-pointer">
      <div className="flex justify-center align-center py-4">
        <h6 className={`w-[50px] ${isStarted ? "" : "hidden"}`}>
          {`${currCount}/${totalCount}`}
        </h6>
        <h6 className="font-bold ml-[35vw] mr-[35vw] z-10 shadow-md"> InterviewSarthi </h6>
        <h6 className={`w-[50px] ${isStarted ? "" : "hidden"}`}>
          {formatTime(timer)}
        </h6>
      </div>
    </div>
  );
};

export default Navbar;
