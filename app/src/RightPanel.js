import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';

const RightPanel = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
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

  const handleSubmit = () => {
    if (userInput.trim() !== '') {
      console.log(userInput);
    }
  };

  return (
    <Box
      sx={{
        width: '80%',
        // marginLeft: '20%',
        backgroundColor: '#f0f0f0',
        height: '100vh',
        overflow: 'hidden',
        // padding: '20px',
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          height: '70vh',
          overflowY: 'auto',
          padding: '10px',
        }}
      >
        {chatMessages.map((msg, index) => (
          <Grid
            key={index}
            container
            direction={msg.sender === 'User' ? 'row-reverse' : 'row'}
            justifyContent={msg.sender === 'User' ? 'flex-end' : 'flex-start'}
            alignItems="center"
            sx={{ marginBottom: '10px' }}
          >
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: msg.sender === 'User' ? '#e1ffc7' : '#c7d8ff',
                }}
              >
                <Typography variant="body1">{msg.message}</Typography>
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Paper>
      <Box sx={{ marginTop: '10px' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your answer here"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={userInput.trim() === ''}
          sx={{ marginTop: '10px', marginLeft: 'auto', display: 'block' }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default RightPanel;
