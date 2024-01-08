import React from 'react';

const Shimmer = () => {
  const shimmerStyles = `
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    .animate-shimmer {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    .hidden {
      display: none;
    }
  `;

  return (
    <div
      className={`inline-block bg-[#5aa9e6]  max-w-[40vw] ml-[10vw] mb-5 min-h-[23vh] max-h-[23vh] rounded-lg 'animate-shimmer'`}
      style={{ position: 'static', overflow: 'hidden' }}
    >
      <style>{shimmerStyles}</style>
      <div className="animate-pulse shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8]"></div>
      <div className="animate-pulse shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8]"></div>
      <div className="animate-pulse shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8]"></div>
      <div className={`animate-pulse shadow-md m-2 p-4 rounded-lg bg-green-50`}></div>
    </div>
  );
};

export default Shimmer;