import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const LeftPanel = () => {
  useEffect(() => {
    // Accessing the camera and starting the video stream
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        const video = document.getElementById('videoElement');
        if (video) video.srcObject = stream;
      })
      .catch(function (error) {
        console.error('Error accessing the camera: ', error);
      });
  }, []);

  const reloadSite = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: '20%',
        backgroundColor: '#f1f1f1',
        position: 'relative',
        height: '100vh',
        overflow: 'auto',
        padding:'0px 0px 0px 0px'
      }}
    >
      <div className="leftContainer">
        <div id="imageleftContainer">
          <img
            id="imageElement"
            src="https://img.youtube.com/vi/G-7jbNPQ0TQ/maxresdefault.jpg"
            alt="Sample Image"
            style={{ width: '98%', height: 'auto', borderRadius: '5px', margin: 'auto' }}
          />
        </div>
        <div id="videoleftContainer">
          <video id="videoElement" autoPlay style={{ width: '98%', height: 'auto', borderRadius: '5px', margin: 'auto' }}></video>
        </div>
        <Button variant="contained" className="speakBtn" style={{ width: '150px', marginLeft: '65px', borderRadius: '5px' }}>
          Pardon Me
        </Button>
        <div className="issueSection">
          <Typography variant="subtitle1" className="issueSectionP" style={{ textAlign: 'center', fontSize: '20px' }}>
            Facing issues?
          </Typography>
          <Typography variant="subtitle1" className="issueSectionP" style={{ textAlign: 'center', fontSize: '20px' }}>
            Reload this page
            <span role="img" aria-label="reload" className="reloadBtn" style={{cursor:'pointer'}} onClick={reloadSite}>
              🔃
            </span>
          </Typography>
          <Typography variant="subtitle1" className="issueSectionP" style={{ textAlign: 'center', fontSize: '20px' , cursor : 'pointer' }}>
            <span role="img" aria-label="phone" className="reloadBtn">
              📞
            </span>
            +91 8618604898
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default LeftPanel;
