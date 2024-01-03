import React, { useState } from "react";
import RightPanel from "./RightPanel";
import { useDispatch, useSelector } from "react-redux";
import { changeStartValue } from "./utils/gemini/startSlice";

const InterviewStarter = () => {
  const [showRightPanel, setShowRightPanel] = useState(false);
  const isStarted = useSelector((state) => state.start.value);
  const dispatch = useDispatch();

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    background: "linear-gradient(to right, #10B981, #3B82F6)",
    cursor: "pointer",
  };

  const handleClick = () => {
    dispatch(changeStartValue(true));
    setShowRightPanel(true);
  };

  return (
    <>
      {showRightPanel === false ? (
        <div style={buttonStyle} onClick={handleClick}>
          <p>Click Anywhere to start the interview</p>
        </div>
      ) : (
        <RightPanel />
      )}
    </>
  );
};

export default InterviewStarter;
