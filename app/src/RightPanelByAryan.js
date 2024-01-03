import React, { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import ChatBox from './ChatBox';
import { useRef } from 'react';
import useGeminiScript from "./utils/gemini/useGeminiScript"
import { useNavigate } from 'react-router-dom';
import { addHistory, toggleGemini } from "../src/utils/gemini/geminiSlice";
import { changeStartValue } from "../src/utils/gemini/startSlice";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
const RightPanelByAryan = () => {
    const textEntered = useRef();
    const [interviewStarted, setInterviewStarted] = useState(false);
    const navigate = useNavigate();
  const isStarted = useSelector((state) => state.start.value);
  const dispatch = useDispatch();

  const history = useSelector((store) => store.gemini.history);
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
      console.log(history);
      console.log(UserInput);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.0,
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

  const handleSendText = async () => {
    const userInput ="."

    const response = await GeminiScript({
      UserInput: userInput,
      history: history,
    });

    dispatch(toggleGemini());
    const jsonUser = {
      role: "user",
      parts: [{ text: userInput }],
    };
    dispatch(addHistory(jsonUser));

    dispatch(addHistory(response));
    dispatch(toggleGemini());
  };

    const startTheInterviewFunction = ()=>{
        setInterviewStarted(true);
        handleSendText();
        dispatch(changeStartValue(true));
        navigate("/interview")

    }
    if(!interviewStarted){
        return(
            <div className='flex items-center justify-center min-w-[80vw] h-[100vh] bg-gradient-to-r from-cyan-500 to-blue-500 hover:cursor-pointer' onClick={startTheInterviewFunction}>
                <p>Click Anywhere to start the interview</p>
            </div>
        )
    }
    // console.log(geminiStore)
  return (
    <div className=' flex flex-col max-width-[330px] bg-slate-400'>
      {/* {geminiStore.map((data, index)=> <ChatBox key={index} role={data?.role} message={data?.parts[0]?.text}/>) } */}

      <div className='flex'>
        <input type='text' ref={textEntered} placeholder='Enter Your answer here' className='bg-white border-4 w-[50em] rounded-e-xl'></input>
        <button className='bg-blue-500 rounded-full p-2 m-2'>SendText</button>
      </div>
    </div>
  )
}

export default RightPanelByAryan
