import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useSelector } from "react-redux";

const ImageOrGIF = ({ isGemini }) => {
  return (
    <div style={{ position: 'relative' }}>

      <img
        id="imageElement"
        src="https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-robot-white-cute-robot-blue-light-background-image_2199825.jpg"
        alt="Sample"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '5px',
          zIndex: '5',
          boxShadow: '2px 2px 2px grey',
        }}
      />

      {isGemini && (
        <iframe
          src="https://giphy.com/embed/qWLNlDMfimhXtM5g0M"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '5px',
            zIndex: '10',
          }}
          title="Giphy Embed"
        ></iframe>
      )}
    </div>

  );
};


const LeftPanel = () => {
  const isGemini = useSelector(store => store.gemini.isGeminiWorking)
  // console.log(isGemini);
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
        backgroundColor: "#F5F5F5",
        position: "relative",
        height: "100vh",
        overflow: "auto",
        padding: "0",
        paddingTop: "30px",
      }}
    >
     
        <div
          className="flex flex-col leftContainer"
          style={{ padding: "10px", minWidth: "20vw" }}
        >
          <div
            id="imageleftContainer"
            style={{ margin: "0 auto", paddingTop: "50px" }}
          >
            <ImageOrGIF isGemini={isGemini} />
          </div>
          <div id="videoleftContainer" style={{ margin: "10px auto" }}>
            <video
              id="videoElement"
              autoPlay
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "5px",
                backgroundColor: "#0d0d0d",
                zIndex: "5",
                boxShadow: "2px 2px 2px grey",
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
              style={{ width: "75%", borderRadius: "5px", marginBottom: "10px", backgroundColor: "#0d0d0d" }}
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
