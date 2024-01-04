import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScore, setReport ,toggleShowEverything} from "../utils/Slices/ReportSlice";
import { useNavigate } from "react-router-dom";

const ChatBox = ({ role, message }) => {
  // console.log("chat-box re-rendered")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toShowEveryhing = useSelector(store=>store.report.toShowEveryhing)
  const [continuationMessage, setcontinuationMessage] = useState(
    "Error in parsing json"
  );
  const [improvMessage, setImprovMessage] = useState("Error in parsing json");
  const [idealAnswerMessage, setIdealAnswerMessage] = useState("Error in parsing json");
  const [questionMessage, setQuestionMessage] = useState(
    "Error in parsing json"
  );
  console.log(message);
  useEffect(() => {
    const convertToJSON = async (message) => {
      return JSON.parse(message);
    };
    if (role === "user") return;

    convertToJSON(message)
      .then((res) => {
        // console.log(res);
        setcontinuationMessage(res["Continuations"]);
        setImprovMessage(res["Improvements"]);
        setQuestionMessage(res["Question"]);
        setIdealAnswerMessage(res["IdealAnswer"])
        let score = res["Score"];
        if (score) {
          const parsedScore = parseInt(score, 10);
          if (!isNaN(parsedScore)) {
            // Only dispatch if the parsed score is a valid integer
            dispatch(addScore(parsedScore));
            console.log("Score added", parsedScore);
          }
        }
        if(message.includes("Scope_of_Improvement") && message.includes("Weak_points") && message.includes("Strong_points")){
          dispatch(setReport(res));
          dispatch(toggleShowEverything());
          navigate("/report")
        }
      })
      .catch((error) => {
        console.error("Error parsing JSON:", message, error);
      });
  }, []);
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
  // console.log(message);
  // console.log(role)

  return (
    <div className="inline-block mr-[30vw] ml-[10vw] bg-[#5aa9e6] rounded-lg">
      {improvMessage !== "Error in parsing json" && improvMessage && (
        <p className="shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8] ">
          {improvMessage}
        </p>
      )}

      {continuationMessage &&
        continuationMessage !== "Error in parsing json" && (
          <p className="shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8] ">
            {continuationMessage}
          </p>
        )}

      {questionMessage !== "Error in parsing json" &&
        questionMessage !== undefined && (
          <p className="shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8] ">
            {questionMessage}
          </p>
        )}
        {toShowEveryhing && idealAnswerMessage !== "Error in parsing json" &&
        idealAnswerMessage && (
          <p className="shadow-md m-2 p-4 rounded-lg bg-green-50 ">
            {idealAnswerMessage}
          </p>
        )}
    </div>
  );
};

export default ChatBox;

// const ChatBox = ({role, message}) => {
// console.log("chatbox")
// return (
// <div>
{
  /* <p>{message}</p> */
}
{
  /* </div> */
}
// )
// }
//
