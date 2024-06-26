import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScore, setReport, toggleShowEverything } from "../utils/Slices/ReportSlice";
import { useNavigate } from "react-router-dom";

const ChatBox = ({ role, message }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toShowEverything = useSelector(store => store.report.toShowEveryhing)
  const [continuationMessage, setContinuationMessage] = useState(
    "Error in parsing json"
  );
  const [improvementMessage, setImprovementMessage] = useState("Error in parsing json");
  const [idealAnswerMessage, setIdealAnswerMessage] = useState("Error in parsing json");
  const [questionMessage, setQuestionMessage] = useState(
    "Error in parsing json"
  );
  useEffect(() => {
    const convertToJSON = async (message) => {
      return JSON.parse(message);
    };
    if (role === "user") return;

    convertToJSON(message)
      .then((res) => {
        // console.log(res);
        setContinuationMessage(res["Continuations"]);
        setImprovementMessage(res["Improvements"]);

        setQuestionMessage(res["Question"]);
        var msg = new SpeechSynthesisUtterance();
        msg.text = res["Continuations"];
        msg.rate = 1.9;
        if (res["Continuations"] != undefined && !toShowEverything) window.speechSynthesis.speak(msg);


        setIdealAnswerMessage(res["IdealAnswer"])
        let score = res["Score"];
        if (score && !toShowEverything) {
          const parsedScore = parseInt(score, 10);
          if (!isNaN(parsedScore)) {
            dispatch(addScore(parsedScore));
            console.log("Score added", parsedScore);
          }
        }
        if (message.includes("Scope_of_Improvement") && message.includes("Weak_points") && message.includes("Strong_points")) {
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
      <div className={toShowEverything ? "inline-block my-2  ml-[20vw] mr-[5vw] min-w-[25vw] m-1 " : "inline-block my-2  ml-[30vw] mr-[10vw] min-w-[25vw] m-1"}>
        {role === "user" && (
          <p className="shadow-md p-5 m-2 bg-[#fff] rounded-bl-3xl rounded-tl-3xl rounded-tr-3xl text-wrap">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={toShowEverything ? "inline-block mr-[20vw] ml-[5vw] bg-[#0d0d0d] min-w-[25vw] m-1 shadow-md mt-2 mb-3 rounded-br-3xl rounded-tl-3xl rounded-tr-3xl" : "inline-block mr-[30vw] ml-[10vw] bg-[#0d0d0d] rounded-br-3xl rounded-tl-3xl rounded-tr-3xl min-w-[25vw] m-1 shadow-md mt-2 mb-3"}>
      {improvementMessage !== "Error in parsing json" && improvementMessage && (
        <p className="shadow-md m-2 p-5 rounded-lg bg-[#0d0d0d] text-white">
          {improvementMessage}
        </p>
      )}

      {continuationMessage &&
        continuationMessage !== "Error in parsing json" && (
          <p className="shadow-md m-2 p-5 rounded-3xl bg-[#0d0d0d] text-white">
            {continuationMessage}
          </p>
        )}

      {questionMessage !== "Error in parsing json" &&
        questionMessage !== undefined && (
          <p className="shadow-md m-2 p-5 rounded-lg bg-[#0d0d0d] text-white">
            {questionMessage}
          </p>
        )}
      {toShowEverything && idealAnswerMessage !== "Error in parsing json" && idealAnswerMessage && (
        <p className="shadow-md m-2 p-5 rounded-br-2xl rounded-tl-3xl rounded-tr-3xl bg-green-50">
          {idealAnswerMessage}
        </p>
      )}

    </div>
  );
};

export default ChatBox;
