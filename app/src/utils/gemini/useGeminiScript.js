import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addHistory, toggleGemini } from "./geminiSlice";


const useGeminiScript = ({UserInput}) => {
  const dispatch = useDispatch()
  //start the animation
  dispatch(toggleGemini());
  const history = useSelector((store) => store.gemini.history);
  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const MODEL_NAME = "gemini-pro";
  const API_KEY = process.env.REACT_APP_GEMINI_KEY;
  // console.log(API_KEY)

  async function runChat() {
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

    const result = await chat.sendMessage(UserInput);
    const jsonUser = {
      role: "user",
      parts: [{ text: UserInput}],
    }
    dispatch(addHistory(jsonUser))

    const response = result.response;
    console.log(response);
    const ModelText = response.text();
    // const jsonObject = JSON.parse(response.text())

    const jsonModel = {
      role: "model",
      parts: [{ text: ModelText}],
    }

    dispatch(addHistory(jsonModel))

    //switch of the gemini.
    dispatch(toggleGemini());

    // return jsonObject;
  }

  runChat();
};
export default useGeminiScript;