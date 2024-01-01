import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  SvgIcon,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import GeminiCaller from "./useGeminiCaller";


const RightPanel = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const botResponses = [
    "That's interesting!",
    "Could you elaborate?",
    "I'm not sure I understand.",
    "Tell me more about that.",
    "Have you considered other options?",
  ];

  const generateBotResponse = () => {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      const newMessages = [
        ...chatMessages,
        { sender: "User", message: userInput },
      ];
      const curr = userInput ;
      setChatMessages(newMessages);
      setUserInput("");

      simulateBotResponse(newMessages,curr);
    }
  };

  const simulateBotResponse = async(newMessages,curr) => {
    //   const botResponse = generateBotResponse();
      const botResponse = await GeminiCaller(curr);
      const updatedMessages = [
        ...newMessages,
        { sender: "Bot", message: botResponse },
      ];
      setChatMessages(updatedMessages);
      scrollToBottom();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const messagesEndRef = useRef(null);

  return (
    <Box
      sx={{
        width: "80%",
        backgroundColor: "#f0f0f0",
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
          <Grid
            key={index}
            container
            direction={msg.sender === "User" ? "row-reverse" : "row"}
            justifyContent={msg.sender === "User" ? "flex-end" : "flex-start"}
            alignItems="center"
            sx={{ marginBottom: "10px" }}
          >
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor:
                    msg.sender === "User" ? "#e1ffc7" : "#c7d8ff",
                }}
              >
                <Typography variant="body1">{msg.message}</Typography>
              </Paper>
            </Grid>
          </Grid>
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
          maxRows={2} // Adjust the number of rows as needed
          variant="outlined"
          placeholder="Type your answer here"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ margin: "10px" , paddingBottom:'2px'}}
        />

        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={userInput.trim() === ""}
          sx={{ minWidth: 0, padding: "10px", marginRight: "10px" }}
        >
          <SvgIcon component={SendIcon} viewBox="0 0 24 24" fontSize="large" />
        </Button>
      </Box>
    </Box>
  );
};

export default RightPanel;
