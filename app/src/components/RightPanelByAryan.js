import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { changeStartValue } from "../utils/gemini/startSlice";

const RightPanelByAryan = () => {
  const textEntered = useRef();
  const [interviewStarted, setInterviewStarted] = useState(false);
  const navigate = useNavigate();
  const isStarted = useSelector((state) => state.start.value);
  const dispatch = useDispatch();


  const startTheInterviewFunction = () => {
    setInterviewStarted(true);
    dispatch(changeStartValue(true));
    navigate("/interview");
  };

  if (!interviewStarted) {
    return (
      <div
        className="flex items-center justify-center min-w-[80vw] h-[100vh] bg-gradient-to-r from-cyan-500 to-blue-500 hover:cursor-pointer"
        onClick={startTheInterviewFunction} >
        <p>Click Anywhere to start the interview</p>
      </div>
    );
  }

  return (
    <div className=" flex flex-col max-width-[330px] bg-slate-400">
      <div className="flex">
        <input
          type="text"
          ref={textEntered}
          placeholder="Enter Your answer here"
          className="bg-white border-4 w-[50em] rounded-e-xl"
        ></input>
        <button className="bg-blue-500 rounded-full p-2 m-2">SendText</button>
      </div>
    </div>
  );
};

export default RightPanelByAryan;
