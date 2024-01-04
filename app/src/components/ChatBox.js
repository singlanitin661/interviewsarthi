import React, { useState } from "react";
import { useSelector } from "react-redux";

const ChatBox = ({ role, message , totalCount = 3}) => {
const currCount = useSelector((state) => state.count.count);
  console.log(message);
  // console.log(role)
  const convertToJSON = async (message) => {
    return JSON.parse(message);
  };
  const [continuationMessage, setcontinuationMessage] = useState("Error in parsing json");
  const [improvMessage, setImprovMessage] = useState("Error in parsing json");
  const [questionMessage, setQuestionMessage] = useState("Error in parsing json");
  if (role !== "user" && message !== "understood") {
    convertToJSON(message)
      .then((res) => {
        console.log(res);
        setcontinuationMessage(res["Continuations"]);
        setImprovMessage(res["Improvements"]);
        setQuestionMessage(res["Question"])
        console.log(continuationMessage);
        console.log(improvMessage);
        console.log(questionMessage);

      })
      .catch((error) => {
        console.error("Error parsing JSON:", error);
      });
  }

  return (
    <div className="inline-block w-auto h-auto">
      {improvMessage !== "Error in parsing json" && improvMessage && (
              <p className="shadow-md my-2 p-4 rounded-lg bg-green-200 mr-[30vw] ml-[10vw]">
                {improvMessage}
              </p>
            )}

      {(role === "user" || (continuationMessage && continuationMessage !== "Error in parsing json")) && (
        <p
          className={
            role === "user"
              ? "shadow-md my-2 p-4 bg-[#42bdfc] ml-[30vw] mr-[10vw] rounded-lg"
              : "shadow-md my-2 p-4 rounded-lg bg-gray-200 mr-[30vw] ml-[10vw]"
          }
        >
          {role === "user" || (message === "understood" && role !== "user")
            ? message
            : continuationMessage}
        </p>
      )}
  
      {(questionMessage !== "Error in parsing json" && questionMessage ) && (
        <p className="shadow-md my-2 p-4 rounded-lg bg-red-200 mr-[30vw] ml-[10vw]">
          {questionMessage}
        </p>
      )}
    </div>
  );
  
};

export default ChatBox;
