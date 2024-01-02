import {
  Typography,
  Paper,
  Grid,
} from "@mui/material";
const ChatBubble = ({ sender, message }) => {
    const isUser = sender === "User";
    const marginLeft = isUser ? "360px" : "40px";
    const marginRight = isUser ? "40px" : "360px";
    const backgroundColor = isUser ? "#42bdfc" : "#f0f1f1";
  
    return (
      <Grid
        container
        direction={isUser ? "row-reverse" : "row"}
        justifyContent={isUser ? "flex-end" : "flex-start"}
        alignItems="center"
        sx={{ marginBottom: "10px", padding: "5px" }}
      >
        <Grid item>
          <Paper
            elevation={3}
            sx={{
              padding: "10px",
              marginLeft,
              marginRight,
              borderRadius: "10px",
              backgroundColor,
            }}
          >
            <Typography variant="body1">{message}</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  };
export default ChatBubble;