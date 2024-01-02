import React, { useState, useEffect, useRef } from "react";
import {
  Box, TextField, Button, Paper, SvgIcon
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import GeminiCaller from "./useGeminiCaller";
import { useDispatch, useSelector } from "react-redux";
import { changeSpeakValue } from "./utils/gemini/speakSlice";
import ChatBubble from "./ChatBubble";


const RightPanel = ({ totalCount = 3 }) => {
  const [micbtn, setMicbtn] = useState(false);
  const [count, setCount] = useState(1);
  const [chatMessages, setChatMessages] = useState([{ sender: "Bot", message: "Introduce Yourself!" }]);
  const [userInput, setUserInput] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const isSpeaking = useSelector((state) => state.speak.value);
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      dispatch(changeSpeakValue(true));
      const newMessages = [
        ...chatMessages,
        { sender: "User", message: userInput },
      ];
      setChatMessages(newMessages);
      setUserInput("");
      simulateBotResponse(newMessages, userInput);
    }
  };

  const simulateBotResponse = async (newMessages, curr) => {
    setCount((prevCount) => prevCount + 1);
    const botResponse = await GeminiCaller(curr);
    if(count === totalCount){
      const updatedMessages = [
        ...newMessages,
        { sender: "Bot", message: "Score : "+botResponse.score },
        { sender: "Bot", message: "Feedback : " + botResponse.feedback },
        { sender: "Bot", message: "You have successfully completed the Interview" },
      ];
      setChatMessages(updatedMessages);
    
    }else{
    const updatedMessages = [
      ...newMessages,
      { sender: "Bot", message: "Score : "+ botResponse.score },
      { sender: "Bot", message: "Feedback : " + botResponse.feedback },
      { sender: "Bot", message: "Question : " + botResponse.question },
    ];
    setChatMessages(updatedMessages);
  
  }
    dispatch(changeSpeakValue(false));
    scrollToBottom();
  };


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleMicBtn = async () => {
    setMicbtn((prevMicbtn) => !prevMicbtn);
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();
        setRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    const chunks = [];
    chunks.push(event.data);
    const blob = new Blob(chunks, { type: "audio/wav" });
    // You can send the recorded audio blob to your server for processing if needed
    console.log("Recorded audio blob:", blob);
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <Box
      sx={{
        width: "80%",
        backgroundColor: "#f0f1f1",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          height: "76vh",
          overflowY: "scroll",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          padding: "10px",
          "&::-webkit-scrollbar": {
            width: "0",
            height: "0",
          },
        }}
      >
        {chatMessages.map((msg, index) => (
          <ChatBubble key={index} sender={msg.sender} message={msg.message} />
        ))}
        <div ref={messagesEndRef} />
      </Paper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={2}
          variant="outlined"
          placeholder="Type your answer here"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            margin: "10px",
            paddingBottom: "2px",
            borderRadius: "5px",
            zIndex: 100,
          }}
        />
        <Button
          variant="contained"
          onClick={handleMicBtn}
          style={{
            minWidth: 0,
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            zIndex: 100,
            backgroundColor: "black",
            color: "white",
          }}
        >
          {micbtn ? (
            <KeyboardVoiceIcon viewBox="0 0 24 24" fontSize="large" />
          ) : (
            <MicOffIcon viewBox="0 0 24 24" fontSize="large" />
          )}
        </Button>
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={userInput.trim() === ""}
          sx={{
            minWidth: 0,
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            zIndex: 100,
            backgroundColor: "black",
          }}
        >
          <SvgIcon component={SendIcon} viewBox="0 0 24 24" fontSize="large" />
        </Button>
      </Box>
    </Box>
  );
};

export default RightPanel;