import React, { useEffect, useRef } from "react";
import "./Sidebar.css";

function Sidebar() {
  const videoRef = useRef();

  useEffect(() => {
    async function getMediaStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error(err);
      }
    }

    getMediaStream();
  }, []);

  return (
    <div className="sidebar">
      <div className="green-box"></div>
      <div className="video-box-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="video-box"
        />
      </div>
    </div>
  );
}

export default Sidebar;



// import React, { useEffect, useRef } from "react";

// function Sidebar() {
//   const videoRef = useRef();

//   useEffect(() => {
//     async function getMediaStream() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });
//         videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     getMediaStream();
//   }, []);

//   return (
//     <div className="sidebar">
//       <div style={{ background: "green", width: "100%", height: "50px" }}></div>
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         style={{ width: "100%", height: "calc(100% - 50px)" }}
//       />
//     </div>
//   );
// }

// export default Sidebar;
