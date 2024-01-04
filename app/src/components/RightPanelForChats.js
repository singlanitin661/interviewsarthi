import { useSelector, useDispatch } from "react-redux";
import { addHistory, toggleGemini,toggleGemini2 } from "../utils/gemini/geminiSlice";
import ChatBox from "./ChatBox";
import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { changeCountValue } from "../utils/gemini/countSlice";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const RightPanelForChats = () => {
  const history = useSelector((store) => store.gemini.history);

  const dispatch = useDispatch();
  const geminiStore = useSelector((store) => store.gemini.history);
  const textEntered = useRef();
  const chatContainerRef = useRef(null);
  const GeminiScript = async ({ UserInput, history }) => {
    const {
      GoogleGenerativeAI,
      HarmCategory,
      HarmBlockThreshold,
    } = require("@google/generative-ai");

    const MODEL_NAME = "gemini-pro";
    const API_KEY = process.env.REACT_APP_GEMINI_KEY;
    // console.log(API_KEY)

    async function runChat({ UserInput, history }) {
      // history = history.pop();
      console.log(history);
      console.log(UserInput);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history,
      });
      //   console.log(UserInput)
      const result = await chat.sendMessage(UserInput);

      const response = result.response;
      //   console.log(response);
      const ModelText = response.text();

      const jsonModel = {
        role: "model",
        parts: [{ text: ModelText }],
      };
      //   console.log(jsonModel);
      return jsonModel;
    }

    return runChat({ UserInput: UserInput, history: history });
  };
  useEffect(()=>{
    async function temp(){
      dispatch(toggleGemini2(true));
      const response = await GeminiScript({
        UserInput: ".",
        history: history,
      });
      const jsonUser = {
        role: "user",
        parts: [{ text: "." }],
      };
      dispatch(addHistory(jsonUser))
      dispatch(addHistory(response));
      dispatch(toggleGemini2(false));
    }
    temp();
  }, [])
  const handleSendText = async () => {

    
    const userInput = textEntered.current.value;

    textEntered.current.value = "";

    dispatch(toggleGemini());
    

    const response = await GeminiScript({
      UserInput: userInput,
      history: history,
    });
    const jsonUser = {
      role: "user",
      parts: [{ text: userInput }],
    };
    dispatch(addHistory(jsonUser));    

    dispatch(addHistory(response));
    dispatch(toggleGemini());
    dispatch(changeCountValue());
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendText();
    }
  };
  useEffect(() => {
    // Scroll to the bottom of the chat container when geminiStore changes
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [geminiStore]);
  return (
    <div className="bg-[#f0f1f1]">
      <div className="flex flex-col bg-white min-w-[80vw] min-h-[80vh] -mt-16 max-w-[80vw]">
        <div
          ref={chatContainerRef}
            className="chat flex flex-col hide-scrollbar min-h-[80vh] max-h-[80vh] overflow-auto mt-16"
                  >
          {geminiStore.map(
            (data, index) =>
              index > 2 && (
                <ChatBox
                  key={index}
                  role={data?.role}
                  message={data?.parts[0]?.text}
                />
              )
          )}
        </div>
      </div>
      <div className="flex p-3 items-center justify-center bg-[#f0f1f1]">
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
          onClick={handleSendText}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default RightPanelForChats;