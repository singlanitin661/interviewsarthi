import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";

const LeftPanel = () => {
  useEffect(() => {
    // Accessing the camera and starting the video stream
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        const video = document.getElementById("videoElement");
        if (video) video.srcObject = stream;
      })
      .catch(function (error) {
        console.error("Error accessing the camera: ", error);
      });
  }, []);

  const reloadSite = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: "20%",
        backgroundColor: "#f1f1f1",
        position: "relative",
        height: "100vh",
        overflow: "auto",
        padding: "0",
        paddingTop: "30px",
      }}
    >
      <div className="leftContainer" style={{ padding: "10px" }}>
        <div id="imageleftContainer" style={{ margin: "0 auto" }}>
          <img
            id="imageElement"
            src="https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-robot-white-cute-robot-blue-light-background-image_2199825.jpg"
            alt="Sample Image"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "5px",
              paddingTop: "50px",
            }}
          />
        </div>
        <div id="videoleftContainer" style={{ margin: "10px auto" }}>
          <video
            id="videoElement"
            autoPlay
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "5px",
              backgroundColor: "black",
            }}
          ></video>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            className="speakBtn"
            style={{ width: "75%", borderRadius: "5px", marginBottom: "10px" }}
          >
            Pardon Me
          </Button>
        </div>
        <div className="issueSection" style={{ textAlign: "center" }}>
          <Typography
            variant="subtitle1"
            className="issueSectionP"
            style={{ fontSize: "20px" }}
          >
            Facing issues?{" "}
            <span
              role="img"
              aria-label="reload"
              className="reloadBtn"
              style={{ cursor: "pointer" }}
              onClick={reloadSite}
            >
              <CachedIcon />
            </span>
          </Typography>
          <Typography
            variant="subtitle1"
            className="issueSectionP"
            style={{ fontSize: "20px", cursor: "pointer" }}
          >
            <span role="img" aria-label="phone" className="reloadBtn">
              <LocalPhoneIcon />
            </span>{" "}
            +91 8618604898
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default LeftPanel;
