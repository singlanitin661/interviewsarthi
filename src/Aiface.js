import React, { useState, useRef } from 'react';
import "./Aiface.modules.css"
const Sidebar = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoRef = useRef();

  const speak = () => {
    setIsSpeaking(true);
    const msg = new SpeechSynthesisUtterance('Hello, world!');
    window.speechSynthesis.speak(msg);
    setIsSpeaking(false);
  };

  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="sidebar">
      <div className="video-container">
        <video className="video" ref={videoRef} muted />
      </div>
      <button className="speak-btn" onClick={speak}>
        Speak
      </button>
    </div>
  );
};

export default Sidebar;
