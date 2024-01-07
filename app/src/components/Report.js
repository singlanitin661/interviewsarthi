import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import ReportComp from "./ReportComp";

const Report = () => {
  const report = useSelector((store) => store.report);
  const geminiHistory = useSelector((store) => store.gemini.history);
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

  let totalScore = 0;
  for (let i = 0; i < report.score.length; i++) {
    totalScore = totalScore + report.score[i];
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="report left flex-grow flex-col items-center justify-center h-[100vh] w-[40vw] hide-scrollbar overflow-scroll bg-gray-400 pt-20 "> 
          <div className="bg-white rounded-lg shadow-md z-100 w-full max-w-md m-auto mb-2 p-10">
            <h1 className="text-3xl font-bold text-center">
              Congrats on Completing Your Interview!🥳
            </h1>
            <p className="text-xl font-semibold text-center mb-2 cursor-pointer">{totalScore}/{report.score.length * 20}</p>
            
            <ReportComp heading="Scope of Improvement" desc={report?.report?.["Scope_of_Improvement"]} />
            <ReportComp heading="Weak Points" desc={report?.report?.["Weak_points"]} />
            <ReportComp heading="Feedbacks/Interviewer's Comment" desc={report?.report?.["Feedbacks_or_Interviewers_comment"]} />
            <ReportComp heading="Rating for the Candidate" desc={report?.report?.["Rating_for_the_candidate"]} />
          
          </div>
        </div>
        <div className="right h-[100vh] w-[60vw] bg-gray-100 chat flex flex-col hide-scrollbar overflow-x-hidden pt-20 rounded-lg">
        {geminiHistory.map(
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
      
    </>
  );
};

export default Report;
