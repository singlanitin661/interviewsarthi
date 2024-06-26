import { useSelector, useDispatch } from "react-redux";
import {
  addHistory,
  toggleGemini2,
  removeHistory
} from "../utils/gemini/geminiSlice";
import ChatBox from "./ChatBox";
import React, { useState, useRef, useEffect } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';
import { changeCountValue } from "../utils/gemini/countSlice";
import GeminiScript from "../utils/GeminiFn";
import Shimmer from "./Shimmer";


const RightPanelForChats = ({ totalCount = 4 }) => {
  const dispatch = useDispatch();
  const textEntered = useRef();
  const chatContainerRef = useRef(null);

  const [micOn, setMicOn] = useState(false);
  const isGeminiWorking = useSelector(store => store.gemini.isGeminiWorking);
  const history = useSelector((store) => store.gemini.history);

  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [speechWarn, setSpeechWarn] = useState('All good!');

  useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const speechTokens = speechTokenize(event.results[event.results.length - 1][0].transcript);
      let speechScore = 0;

      fetch("./AFINN.json")
        .then(response => response.json())
        .then(data => {
          speechTokens.forEach(token => {
            if (data[token]) {
              speechScore += data[token];
            }
          });

          if (speechScore >= 0) {
            setSpeechWarn("All good!");
          } else {
            setSpeechWarn("Warning!");
            alert("PLEASE RESTART SPEECH TO TEXT");
            Array.from({ length: 3 }, (_, index) => {
              setTimeout(() => {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.start(audioCtx.currentTime);
                oscillator.frequency.value = 1320;
                oscillator.stop(audioCtx.currentTime + 0.05);
              }, index * 300);
            });
          }
        });

      setTranscript(prevTranscript => {
        textEntered.current.value = event.results[event.results.length - 1][0].transcript
        return prevTranscript + textEntered.current.value
      });
    };

    setRecognition(recognition);

    return () => {
      recognition.stop();
    };
  }, []);


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

  const handleMicClick = () => {
    if (!micOn) {
      startSpeechRecognition()
    } else {
      stopSpeechRecognition();
    }
    console.log(micOn + " " + transcript);
    setMicOn((micOn) => !micOn);
  }

  const speechTokenize = (input) => {
    return input
      .replace(/[^a-zA-Z ]+/g, '')
      .replace(/ {2,}/g, ' ') // Corrected regular expression
      .toLowerCase()
  };



  const startSpeechRecognition = () => {
    recognition.start();
  };

  const stopSpeechRecognition = () => {
    recognition.stop();
  };

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
      alert("An error occurred. Please reload the page.");
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
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] justify-between">
      <div className="flex flex-col bg-[#f5f5f5] min-w-[80vw] min-h-[80vh] -mt-16 max-w-[80vw] grow">
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

      <div className="bottom-0 bg-[#F5F5F5] sticky h-fit flex ml-20 p-2 items-center justify-center">
        {!isGeminiWorking ? (
          <>
            <TextareaAutosize
              style={{
                outline: '1px solid transparent',
              }}
              className={"max-h-30 shadow-md border sm:rounded-lg md:rounded-xl lg:rounded-xl xl:rounded-xl overflow-y-scroll grow p-4 focus:border-gray-500"}
              placeholder={"Type your answer"}
              maxRows={3}
              ref={textEntered}
              onKeyDown={handleKeyPress}
            />


            <button
              className="relative bg-[#0d0d0d] px-2 py-3 pb-3 rounded-md ml-2 text-white transition duration-300 hover:text-gray-400 "
              onClick={handleMicClick}
            >
              {micOn ? <KeyboardVoiceIcon /> : <MicOffIcon />}

            </button>

            <button
              className="relative bg-[#0d0d0d] px-4 py-3 pb-3 rounded-md ml-2 mr-2 text-white transition duration-300 hover:text-gray-400 "
              onClick={handleSendText}
            >
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