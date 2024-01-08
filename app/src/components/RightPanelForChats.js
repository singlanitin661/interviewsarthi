import { useSelector, useDispatch } from "react-redux";
import {
  addHistory,
  toggleGemini2,
  removeHistory
} from "../utils/gemini/geminiSlice";
import ChatBox from "./ChatBox";
import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { changeCountValue } from "../utils/gemini/countSlice";
import GeminiScript from "../utils/GeminiFn";
import Shimmer from "./Shimmer";


const RightPanelForChats = ({ totalCount = 4 }) => {
  const dispatch = useDispatch();
  const textEntered = useRef();
  const chatContainerRef = useRef(null);

  const isGeminiWorking = useSelector(store => store.gemini.isGeminiWorking);
  const history = useSelector((store) => store.gemini.history);


  useEffect(() => {
    const scrollToBottom = () => {
      const container = chatContainerRef.current;

      if (container) {
        const targetScroll = container.scrollHeight - container.clientHeight;

        const animateScroll = () => {
          const currentScroll = container.scrollTop;
          const distance = targetScroll - currentScroll;
          const step = distance / 30;

          if (Math.abs(distance) > 1) {
            container.scrollTop += step;
            requestAnimationFrame(animateScroll);
          } else {
            container.scrollTop = targetScroll;
          }
        };

        animateScroll();
      }
    };

    scrollToBottom();

  }, [history, isGeminiWorking]);


  const handleSendText = async () => {
    const userInput = textEntered.current.value;
    textEntered.current.value = "";
    const jsonUser = {
      role: "user",
      parts: [{ text: userInput }],
    };
    if (history[history.length - 1]?.role === "model")
      dispatch(addHistory(jsonUser));
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
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
    <div className="bg-[#F5F5F5]">
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

      <div className="flex p-3 items-center justify-center bg-[#F5F5F5]">
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
          <h1 className="text-2xl">Please wait........</h1>
        )}
      </div>
    </div>
  );
};

export default RightPanelForChats;
