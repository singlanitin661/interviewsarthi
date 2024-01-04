import React from "react";
import Navbar from "./Navbar";
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const report = useSelector((store) => store.report);
  const history = useSelector((store) => store.gemini.history);
  const navigate = useNavigate();
  if (!report.toShowEveryhing) {
    return (
      <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
        <p className="text-3xl font-bold font-red text-center">
          You have not yet completed the interview. Please complete it
        </p>
        <button
          className="p-4 bg-blue-500 font-white rounded-2xl m-8"
          onClick={() => navigate("/interview")}
        >
          Take me to the Interview
        </button>
      </div>
    );
  }
  console.log(history);
  let Score = 0;

  for (let i = 0; i < report.score.length; i++) {
    Score = Score + report.score[i];
  }

  return (
    <div className="min-h-screen flex flex-row">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 h-[90vh] w-[30vw] mt-16">
        <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-4">
            Congrats on Completing Your Interview!
          </h1>
          <p className="text-xl font-semibold text-center mb-2">{Score}/80</p>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Scope of Improvement:</h2>
            <p className="text-gray-700">
              {report?.report?.["Scope_of_Improvement"]}
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Weak Points:</h2>
            <p className="text-gray-700">{report?.report?.["Weak_points"]}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Feedbacks/Interviewer's Comment:
            </h2>
            <p className="text-gray-700">
              {report?.report?.["Feedbacks_or_Interviewers_comment"]}
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Rating for the Candidate:</h2>
            <p className="text-gray-700">
              {report?.report?.["Rating_for_the_candidate"]}
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 h-[90vh] w-[70vw] mt-16"> */}
      <div className="chat flex flex-col hide-scrollbar min-h-[80vh] max-h-[80vh] overflow-auto mt-16">
        {history.map(
          (data, index) =>
            index > 2 && (
              <ChatBox
                key={index}
                role={data?.role}
                message={data?.parts[0]?.text}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Report;
