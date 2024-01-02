import React, { useState, useRef, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Navbar = ({totalCount=3}) => {
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
    if (currCount === totalCount) {
      clearInterval(timerRef.current);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isStarted, currCount, totalCount]);

  return (
    <AppBar position="fixed" style={{ backgroundColor: "black" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="text"
            style={{ pointerEvents: "none", opacity: isStarted ? 1 : 0 }}
          >
            <Typography variant="h6" style={{ color: "#f0f1f1" }}>
              {currCount}/{totalCount}
            </Typography>
          </Button>
        </div>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          InterviewSarthi
        </Typography>
        <Button
          style={{ color: "#f0f1f1", opacity: isStarted ? 1 : 0 }}
          onClick={handleTimerClick}
        >
          <Typography variant="h6">{formatTime(timer)}</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
