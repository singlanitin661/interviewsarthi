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

    return (
      <div
        className="flex items-center justify-center min-w-[80vw] h-[100vh] bg-gradient-to-r from-cyan-500 to-blue-500 hover:cursor-pointer pb-20"
        onClick={startTheInterviewFunction} >
        <div className=" bg-black opacity-60 rounded-md ml-10 mb-20 -mt-10">
          <p className="text-4xl text-white  rounded-xl p-4 pb-5 pl-6 pr-6 opacity-100">Click Anywhere to start the interview</p>
        </div>
      </div>
    );
};

export default RightPanelByAryan;