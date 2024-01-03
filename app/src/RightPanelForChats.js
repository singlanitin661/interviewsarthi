import { useSelector, useDispatch } from "react-redux";
import { addHistory, toggleGemini } from "../src/utils/gemini/geminiSlice";
import ChatBox from "./ChatBox";
import { useRef } from "react";
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
    const userInput = textEntered.current.value;

    textEntered.current.value = "";

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

  return (
    <div className="flex flex-col bg-gradient-to-r from-purple-500 to-pink-500 min-w-[80vw] min-h-[100vh] -mt-16 max-w-[80vw]">
      <div className="chat flex flex-col min-h-[80vh] max-h-[80vh] overflow-auto mt-16">
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
      <div className="flex h-[20vh] min-h-[calc(20vh-64px)] max-h-[calc(20vh-64px)] items-center justify-center">
        <input
          type="text"
          ref={textEntered}
          placeholder="Enter Your answer here"
          className="bg-white border-4 w-[100vw] rounded-xl h-[12vh] m-4 p-2"
        />
        <button
          onClick={handleSendText}
          className="bg-blue-500 rounded-full p-2 m-2 py-6"
        >
          SendText
        </button>
      </div>
    </div>
  );
};

export default RightPanelForChats;
