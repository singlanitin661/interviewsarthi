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
      background: linear-gradient(90deg, #bfbfbf 25%, #e0e0e0 50%, #bfbfbf 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    .hidden {
      display: none;
    }
  `;

  return (
    <div
      className={`inline-block bg-[#bfbfbf]  max-w-[40vw] ml-[10vw] mb-5 min-h-40 max-h-40 rounded-lg animate-shimmer flex flex-col justify-center align-center`}
      style={{ position: 'static', overflow: 'hidden' }}
    >
      <style>{shimmerStyles}</style>
      <div className="animate-pulse shadow-md m-1 p-4 rounded-lg bg-[#737373]"></div>
      <div className="animate-pulse shadow-md m-1 p-4 rounded-lg bg-[#737373]"></div>
      <div className="animate-pulse shadow-md m-1 p-4 rounded-lg bg-[#737373]"></div>
      <div className={`animate-pulse shadow-md m-1 p-4 rounded-lg bg-green-50`}></div>
    </div>
  );
};

export default Shimmer;