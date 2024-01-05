import React, { useState, useEffect } from 'react';

const Shimmer = () => {
  const [shimmer, setShimmer] = useState(true);

  useEffect(() => {
    const shimmerTimeout = setTimeout(() => {
      setShimmer(false);
    }, 8000); // Adjust the duration of the shimmer effect as needed

    return () => {
      clearTimeout(shimmerTimeout);
    };
  }, []);

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
      className={`inline-block mr-[30vw] ml-[10vw] bg-[#5aa9e6] rounded-lg ${shimmer && 'animate-shimmer'}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <style>{shimmerStyles}</style>
      <div className="animate-pulse shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8]"></div>
      <div className="animate-pulse shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8]"></div>
      <div className="animate-pulse shadow-md m-2 p-4 rounded-lg bg-[#7fc8f8]"></div>
      <div className={`animate-pulse shadow-md m-2 p-4 rounded-lg bg-green-50 ${!shimmer && 'hidden'}`}></div>
    </div>
  );
};

export default Shimmer;
