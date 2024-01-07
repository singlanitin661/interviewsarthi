import { useSelector, useDispatch } from "react-redux";
import {
  addHistory,
  toggleGemini2,
  removeHistory
} from "../utils/gemini/geminiSlice";
import ChatBox from "./ChatBox";
import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { changeCountValue } from "../utils/gemini/countSlice";
import GeminiScript from "../utils/GeminiFn";
import Shimmer from "./Shimmer";

const RightPanelForChats = ({ totalCount = 4 }) => {
  const isGeminiWorking = useSelector(store => store.gemini.isGeminiWorking);
  const history = useSelector((store) => store.gemini.history);
  const currCount = useSelector((state) => state.count.count);
  const dispatch = useDispatch();
  const textEntered = useRef();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight + 100;


    const scrollToBottom = () => {
      const container = chatContainerRef.current;
      const targetScroll = container.scrollHeight - container.clientHeight;

      const animateScroll = () => {
        const currentScroll = container.scrollTop;
        const distance = targetScroll - currentScroll;
        const step = distance / 20; // Adjust the number of steps as needed

        if (Math.abs(distance) > 1) {
          container.scrollTop += step;
          requestAnimationFrame(animateScroll);
        } else {
          container.scrollTop = targetScroll;
        }
      };

      animateScroll();
    };

    // Call scrollToBottom where you want to trigger the smooth scrolling
    scrollToBottom();

  }, [history, isGeminiWorking]);  // Trigger the effect when history or isGeminiWorking changes


  const handleSendText = async () => {
    const userInput = textEntered.current.value;
    textEntered.current.value = "";
    const jsonUser = {
      role: "user",
      parts: [{ text: userInput }],
    };
    if (history[history.length - 1]?.role === "model") dispatch(addHistory(jsonUser));
    else {
      dispatch(removeHistory());
      dispatch(addHistory(jsonUser));
    }
    dispatch(toggleGemini2(true));
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

    try {
      const response = await GeminiScript({
        UserInput: userInput,
        history: history,
      });
      console.log("Success:", response);
      if (response?.parts[0]?.text.includes("Score") && !response?.parts[0]?.text.includes("\"Score\" : null,")) { dispatch(changeCountValue()); }
      dispatch(addHistory(response));

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }

    dispatch(toggleGemini2(false));
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendText();
    }
  };
  return (
    <div className="bg-[#f0f1f1]">
      <div className="flex flex-col bg-white min-w-[80vw] min-h-[80vh] -mt-16 max-w-[80vw]">
        <div
          ref={chatContainerRef}
          className="chat flex flex-col hide-scrollbar min-h-[80vh] max-h-[80vh] overflow-auto mt-16"
        >
          {history.map(
            (data, index) =>
              index > 2 && (
                <ChatBox
                  key={index}
                  role={data?.role}
                  message={data?.parts[0]?.text}
                />
              )
          )}
          {
            isGeminiWorking && <Shimmer />
          }
        </div>
      </div>

      <div className="flex p-3 items-center justify-center bg-[#f0f1f1]">
        {!isGeminiWorking ? (
          <>
            <TextField
              fullWidth
              type="text"
              inputRef={textEntered}
              onKeyPress={handleKeyPress}
              label="Type your answer"
            />
            <button
              size="large"
              className="py-4 px-5 pb-3 ml-2 mr-2 rounded-md bg-black text-white  transition duration-300 ease-in-out hover:text-gray-400"
              onClick={handleSendText}>
              <SendIcon />
            </button>
          </>
        ) : (
          <h1>Please wait........</h1>
        )}
      </div>
    </div>
  );
};

export default RightPanelForChats;
