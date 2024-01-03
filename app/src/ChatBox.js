import React, { useState } from 'react';

const ChatBox = ({ role, message }) => {
    console.log(message)
    // console.log(role)
    const convertToJSON = async (message) => {
      return JSON.parse(message);
    }
    const  [finalMessage, setFinalMessage] = useState("Error in parsing json");
    if (role !== "user" && message !== "understood") {
      convertToJSON(message)
        .then((res) => {
          console.log(res);
          setFinalMessage(res["Continuations"]);
          console.log(finalMessage);
        })
        .catch((error) => {
          console.error("Error parsing JSON:", error);
        });
    }
    
  return (
    <p className={role === "user" ? 'my-2 p-4 bg-green-200 ml-[30vw] mr-[10vw] rounded-lg' : 'my-2 p-4 rounded-lg bg-gray-200 mr-[30vw] ml-[10vw]'}>
      {role === "user" || (message === "understood" && role!=="user") ? message : finalMessage};
      {/* {message} */}
    </p>
  );
}

export default ChatBox;
