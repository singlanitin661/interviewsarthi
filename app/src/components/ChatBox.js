import React, { useState } from "react";

const ChatBox = ({ role, message }) => {
  console.log(message);
  // console.log(role)
  const convertToJSON = async (message) => {
    return JSON.parse(message);
  };
  const [finalMessage, setFinalMessage] = useState("Error in parsing json");
  const [improvMessage, setImprovMessage] = useState("Error in parsing json");
  if (role !== "user" && message !== "understood") {
    convertToJSON(message)
      .then((res) => {
        console.log(res);
        setFinalMessage(res["Continuations"]);
        setImprovMessage(res["Improvements"]);
        console.log(finalMessage);
      })
      .catch((error) => {
        console.error("Error parsing JSON:", error);
      });
  }

  return (
    <div className="inline-block w-auto h-auto">
      {improvMessage !== "Error in parsing json" && improvMessage && <p className="shadow-md my-2 p-4 rounded-lg bg-green-200 mr-[30vw] ml-[10vw]">{improvMessage}</p>}
      <p className={ role === "user" ? "shadow-md my-2 p-4 bg-[#42bdfc] ml-[30vw] mr-[10vw] rounded-lg"  : "shadow-md my-2 p-4 rounded-lg bg-gray-200 mr-[30vw] ml-[10vw]"} >
        {role === "user" || (message === "understood" && role !== "user")
                 ? message
                 : finalMessage
  }
      </p>
      
    </div>
  );
};

export default ChatBox;
