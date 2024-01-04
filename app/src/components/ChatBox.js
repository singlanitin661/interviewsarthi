import React, { useState } from "react";

const ChatBox = ({ role, message }) => {
  const [continuationMessage, setcontinuationMessage] = useState(
    "Error in parsing json"
  );
  const [improvMessage, setImprovMessage] = useState("Error in parsing json");
  const [questionMessage, setQuestionMessage] = useState(
    "Error in parsing json"
  );
  if (role === "user") {
    return (
      <div className="inline-block my-2  ml-[30vw] mr-[10vw] rounded-lg">
        {role === "user" && (
          <p className="shadow-md p-4 m-2 bg-[#ffe45e]  rounded-lg text-wrap">
            {message}
          </p>
        )}
      </div>
    );
  }
  console.log(message);
  // console.log(role)
  const convertToJSON = async (message) => {
    return JSON.parse(message);
  };

  convertToJSON(message)
    .then((res) => {
      console.log(res);
      setcontinuationMessage(res["Continuations"]);
      setImprovMessage(res["Improvements"]);
      setQuestionMessage(res["Question"]);
      console.log(continuationMessage);
      console.log(improvMessage);
      console.log(questionMessage);
    })
    .catch((error) => {
      console.error("Error parsing JSON:", error);
    });
  return (
    <div className="inline-block mr-[30vw] ml-[10vw] bg-[#5aa9e6] rounded-lg">
      {improvMessage !== "Error in parsing json" && improvMessage && (
        <p className="shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8] ">
          {improvMessage}
        </p>
      )}

      {continuationMessage &&
        continuationMessage !== "Error in parsing json" && (
          <p
            className=
              "shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8] "
          >
            {continuationMessage}
          </p>
        )}

      {questionMessage !== "Error in parsing json" &&
        questionMessage !== undefined && (
          <p className="shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8] ">
            {questionMessage}
          </p>
        )}
    </div>
  );
};

export default ChatBox;
