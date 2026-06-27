import React from "react";

const Loader = ({ size = 40 }) => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div
        className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default Loader;
